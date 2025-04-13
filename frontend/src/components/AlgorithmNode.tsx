export default function AlgorithmNode({ label }: { label: string }) {
    return (
        <div className="px-4 py-2 bg-white border border-gray-400 rounded shadow text-sm text-gray-800">
            {label}
        </div>
    );
}
