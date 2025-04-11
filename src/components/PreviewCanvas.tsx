// 📁 src/components/PreviewCanvas.tsx
import React, { useEffect, useRef } from "react";

export interface PreviewCanvasProps {
    children: React.ReactNode;
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CANVAS_WIDTH = 3000;
export const CANVAS_HEIGHT = 1200;

export default function PreviewCanvas({ children, onDoubleClick }: PreviewCanvasProps) {
    const scrollRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.scrollLeft = (CANVAS_WIDTH - container.clientWidth) / 2;
            container.scrollTop = (CANVAS_HEIGHT - container.clientHeight) / 2;
        }
    }, []);

    return (
        <div
            ref={scrollRef}
            className="w-full h-[800px] overflow-auto bg-gray-100 border rounded-md"
        >
            <div
                className="w-[3000px] h-[1200px] relative"
                onDoubleClick={onDoubleClick}
            >
                {children}
            </div>
        </div>
    );
}


