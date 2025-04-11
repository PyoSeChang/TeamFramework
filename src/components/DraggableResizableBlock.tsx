/*
 * 핵심 수정 포인트:
 * 1. 리사이즈 핸들에 실제 크기와 스타일 적용
 * 2. 마우스 커서 변경
 * 3. CSS를 분리하여 PowerPoint 스타일 UX 제공
 */

import React, { useState, useEffect, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import "./DraggableResizableBlock.css"; // ✅ CSS 분리

// BlockType 정의
export type BlockType = {
    id: number;
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

// Props 정의
type Props = {
    block: BlockType;
    onUpdate: (newBlock: BlockType) => void;
};

// Component 구현
export default function DraggableResizableBlock({ block, onUpdate }: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: block.id.toString() });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        if (transform && !isResizing) {
            setDragOffset({ x: transform.x, y: transform.y });
        }
    }, [transform, isResizing]);

    useEffect(() => {
        const handleMouseUp = () => {
            if (!isResizing && (dragOffset.x !== 0 || dragOffset.y !== 0)) {
                onUpdate({
                    ...block,
                    x: block.x + dragOffset.x,
                    y: block.y + dragOffset.y,
                });
                setDragOffset({ x: 0, y: 0 });
            }
        };
        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [block, dragOffset, isResizing, onUpdate]);

    const resizeRef = useRef<HTMLDivElement>(null);
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const [initialBlockState, setInitialBlockState] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [activeHandle, setActiveHandle] = useState<string | null>(null);

    const handleResizeMouseDown = (e: React.MouseEvent, handleType: string) => {
        e.stopPropagation();
        e.preventDefault();
        setIsResizing(true);
        setActiveHandle(handleType);
        setInitialMousePos({ x: e.clientX, y: e.clientY });
        setInitialBlockState({ x: block.x, y: block.y, width: block.width, height: block.height });
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isResizing || !activeHandle) return;

            const deltaX = e.clientX - initialMousePos.x;
            const deltaY = e.clientY - initialMousePos.y;

            let { x, y, width, height } = initialBlockState;

            if (activeHandle.includes("w")) {
                x += deltaX;
                width -= deltaX;
            }
            if (activeHandle.includes("e")) {
                width += deltaX;
            }
            if (activeHandle.includes("n")) {
                y += deltaY;
                height -= deltaY;
            }
            if (activeHandle.includes("s")) {
                height += deltaY;
            }

            width = Math.max(width, 40);
            height = Math.max(height, 40);

            onUpdate({ ...block, x, y, width, height });
        };

        const onMouseUp = () => {
            if (isResizing) {
                setIsResizing(false);
                setActiveHandle(null);
            }
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, [isResizing, activeHandle, initialMousePos, initialBlockState, block, onUpdate]);

    const renderContent = () => {
        switch (block.type) {
            case "input": return <input className="w-full h-full" placeholder="Input example" onMouseDown={(e) => e.stopPropagation()} />;
            case "select": return <select className="w-full h-full"><option>Option 1</option><option>Option 2</option></select>;
            case "div": return <div className="w-full h-full">Example div content</div>;
            case "ul": return <ul className="w-full h-full"><li>Item 1</li><li>Item 2</li></ul>;
            default: return <div className="w-full h-full">Default content</div>;
        }
    };

    return (
        <div
            ref={resizeRef}
            className="block-container"
            style={{
                left: block.x + dragOffset.x,
                top: block.y + dragOffset.y,
                width: block.width,
                height: block.height,
            }}
        >
            {[
                "n", "s", "e", "w",
                "nw", "ne", "sw", "se",
            ].map((dir) => (
                <div
                    key={dir}
                    className={`resize-handle handle-${dir}`}
                    onMouseDown={(e) => handleResizeMouseDown(e, dir)}
                />
            ))}

            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                className="drag-area"
            >
                <div className="content-area">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}