// src/components/ObjectTitle.tsx
import React, {useRef} from "react";

interface ObjectTitleProps {
    value: string;
    onChange: (value: string) => void;
}


export default function ObjectTitle({ value, onChange }: ObjectTitleProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => inputRef.current?.focus()}
            placeholder="제목"
            className="bg-transparent text-white text-center text-sm focus:outline-none w-full"
            style={{
                border: "none",
                padding: 0,
            }}
        />
    );
}
