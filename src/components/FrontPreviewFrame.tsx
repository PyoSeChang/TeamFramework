// 📁 src/components/FrontendPreviewFrame.tsx
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import PreviewCanvas from "./PreviewCanvas";
import DraggableResizableBlock from "./DraggableResizableBlock";

interface Block {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

export default function FrontendPreviewFrame() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [selectedType, setSelectedType] = useState<string>("Text");

    // 새 블록을 추가하는 핸들러
    const handleAddBlock = () => {
        const newBlock: Block = {
            id: Date.now(), // 간단하게 날짜를 id로 사용
            x: 200,
            y: 100,
            width: 150,
            height: 100,
            type: selectedType,
        };
        setBlocks((prev) => [...prev, newBlock]);
    };

    // 블록의 위치나 크기가 업데이트 되었을 때 호출
    const handleUpdateBlock = (updatedBlock: Block) => {
        setBlocks((prev) =>
            prev.map((b) => (b.id === updatedBlock.id ? updatedBlock : b))
        );
    };

    return (
        <>
            <div className="mb-2 flex gap-4">
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    <option value="input">input</option>
                    <option value="select">select</option>
                    <option value="ul">ul</option>
                    <option value="div">div</option>
                </select>

                <button
                    onClick={handleAddBlock}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    블록 추가하기
                </button>
            </div>

            <DndContext>
                <PreviewCanvas>
                    {blocks.map((block) => (
                        <DraggableResizableBlock
                            key={block.id}
                            block={block}
                            onUpdate={handleUpdateBlock}
                        />
                    ))}
                </PreviewCanvas>
            </DndContext>
        </>
    );
}
