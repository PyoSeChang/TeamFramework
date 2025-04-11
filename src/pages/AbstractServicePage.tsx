// src/pages/AbstractServicePage.tsx

import ServicePreviewFrame from "../components/ServicePreviewFrame";

export default function AbstractServicePage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">서비스 추상화</h1>
                <ServicePreviewFrame />
            </div>
            <div className="flex-1 p-4 bg-zinc-900 text-white">
                Tailwind 적용 테스트용 박스!
            </div>
        </div>
    );
}
