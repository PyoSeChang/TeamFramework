// src/pages/FrontendPage.tsx
import FrontPreviewFrame from "../components/FrontPreviewFrame";
export default function FrontendPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">프론트 추상화</h1>
                <FrontPreviewFrame />
            </div>
        </div>
    );
}
