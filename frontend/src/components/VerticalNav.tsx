// components/VerticalNav.tsx
interface VerticalNavProps {
    title: string;
    children?: React.ReactNode;
}

export default function VerticalNav({ title, children }: VerticalNavProps) {
    return (
        <nav className="w-full h-full bg-gray-100 border-r border-gray-300 p-4 text-sm text-gray-800">
            <h2 className="font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
                {children || <p className="text-gray-500">+ 항목 없음</p>}
            </div>
        </nav>
    );
}
