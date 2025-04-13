import { useEffect, useRef, useState } from "react";
import AlgorithmNode from "./AlgorithmNode";

interface Props {
    node: {
        x: number;
        y: number;
        label: string;
    };
    onDrag: (dx: number, dy: number) => void;
}

export default function CanvasNode({ node, onDrag }: Props) {
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            setStartPos({ x: e.clientX, y: e.clientY });
            onDrag(dx, dy);
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, startPos, onDrag]);

    return (
        <div
            style={{
                position: "absolute",
                left: node.x,
                top: node.y,
                cursor: "move",
            }}
            onMouseDown={handleMouseDown}
        >
            <AlgorithmNode label={node.label} />
        </div>
    );
}
