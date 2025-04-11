// 📁 src/components/ServicePreviewFrame.tsx
import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import ObjectTitle from "./ObjectTitle";
import PreviewCanvas, { CANVAS_WIDTH, CANVAS_HEIGHT } from "./PreviewCanvas";

interface Node {
    id: number;
    level: number;
    x: number;
    y: number;
    size: number;
    title?: string;
}

const LEVEL_SIZE_MAP: Record<number, number> = {
    1: 300,
    2: 240,
    3: 180,
    4: 120,
    5: 60,
};

function DraggableNode({ node, onChangeTitle }: { node: Node; onChangeTitle: (id: number, value: string) => void }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: node.id.toString() });

    const style: React.CSSProperties = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        width: node.size,
        height: node.size,
        position: "absolute",
        top: node.y,
        left: node.x,
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="bg-blue-500 text-white flex items-center justify-center shadow-lg cursor-move rounded-md"
            style={style}
        >
            <div className="w-[90%] px-1">
                <ObjectTitle value={node.title || ""} onChange={(val) => onChangeTitle(node.id, val)} />
            </div>
        </div>
    );
}

export default function ServicePreviewFrame() {
    const [nodes, setNodes] = useState<Node[]>([
        {
            id: 0,
            level: 1,
            x: CANVAS_WIDTH / 2 - LEVEL_SIZE_MAP[1] / 2,
            y: CANVAS_HEIGHT / 2 - LEVEL_SIZE_MAP[1] / 2,
            size: LEVEL_SIZE_MAP[1],
            title: "루트 서비스",
        },
    ]);

    const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newLevel = 3;
        const newSize = LEVEL_SIZE_MAP[newLevel];

        const newNode: Node = {
            id: nodes.length,
            level: newLevel,
            x,
            y,
            size: newSize,
            title: "",
        };

        setNodes((prev) => [...prev, newNode]);
    };

    const handleTitleChange = (id: number, value: string) => {
        setNodes((prev) =>
            prev.map((node) => (node.id === id ? { ...node, title: value } : node))
        );
    };

    return (
        <DndContext>
            <PreviewCanvas onDoubleClick={handleCanvasDoubleClick}>
                {nodes.map((node) => (
                    <DraggableNode key={node.id} node={node} onChangeTitle={handleTitleChange} />
                ))}
            </PreviewCanvas>
        </DndContext>
    );
}
