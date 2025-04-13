import { useState } from "react";
import PreviewCanvas from "./PreviewCanvas";
import CanvasNode from "./CanvasNode";

type NodeData = {
    id: number;
    x: number;
    y: number;
    label: string;
};

export default function AlgorithmPreviewFrame() {
    const [nodes, setNodes] = useState<NodeData[]>([
        { id: 0, x: 400, y: 100, label: "START" },
        { id: 1, x: 400, y: 200, label: "FIND_MEMBER" },
        { id: 2, x: 400, y: 300, label: "CHECK_IS_ADMIN" },
        { id: 3, x: 200, y: 400, label: "THROW_ERROR" },
        { id: 4, x: 600, y: 400, label: "DEACTIVATE_MEMBER" },
        { id: 5, x: 600, y: 500, label: "SAVE_MEMBER" },
        { id: 6, x: 600, y: 600, label: "SEND_NOTIFICATION" },
    ]);

    const handleAddNode = (label: string) => {
        const newNode: NodeData = {
            id: Date.now(),
            x: 100,
            y: 100,
            label,
        };
        setNodes((prev) => [...prev, newNode]);
    };

    const handleDrag = (id: number, dx: number, dy: number) => {
        setNodes((prev) =>
            prev.map((node) =>
                node.id === id ? { ...node, x: node.x + dx, y: node.y + dy } : node
            )
        );
    };

    return (
        <div className="w-full h-full flex">
            {/* 좌측: 캔버스 */}
            <div className="flex-1 h-full p-4">
                <PreviewCanvas width={1000} height={800}>
                    {nodes.map((node) => (
                        <CanvasNode
                            key={node.id}
                            node={node}
                            onDrag={(dx, dy) => handleDrag(node.id, dx, dy)}
                        />
                    ))}
                </PreviewCanvas>
            </div>

            {/* 우측: 네비 */}
            <div className="w-[20%] h-full border-l border-gray-300 p-4 bg-gray-50">
                <h3 className="font-bold mb-4 text-sm text-gray-700">🧩 노드 삽입</h3>
                {["조건 검사", "저장", "알림"].map((label, i) => (
                    <button
                        key={i}
                        onClick={() => handleAddNode(label)}
                        className="w-full text-left text-sm px-2 py-1 mb-2 rounded bg-white border hover:bg-gray-100"
                    >
                        + {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
