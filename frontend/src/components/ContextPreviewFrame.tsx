// components/ContextPreviewFrame.tsx

import MemberDeactivationContextFlow from "./MemberDeactivationContextFlow";

export default function ContextPreviewFrame() {
    return (
        <div className="w-full h-full bg-white border border-gray-300 p-4 overflow-auto">
            <h3 className="font-bold mb-2 text-gray-700">컨텍스트 흐름</h3>
            {/* 예시 콘텐츠 */}
            <div className="w-full h-full bg-white border border-gray-300 p-4 overflow-auto">
                <h3 className="font-bold mb-2 text-gray-700">컨텍스트 흐름</h3>
                <MemberDeactivationContextFlow />
            </div>
        </div>
    );
}
