// 📁 src/components/MemberDeactivationContextFlow.tsx
export default function MemberDeactivationContextFlow() {
    const nodeStyle =
        "w-60 px-4 py-3 bg-white border border-gray-300 shadow text-sm rounded text-gray-800";
    const labelStyle = "text-xs text-gray-500 mb-1";

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* View */}
            <div className="flex flex-col items-center">
                <span className={labelStyle}>View</span>
                <div className={nodeStyle}>회원 탈퇴 버튼 클릭</div>
            </div>

            {/* Controller */}
            <div className="flex flex-col items-center">
                <span className={labelStyle}>Controller</span>
                <div className={nodeStyle}>POST /member/deactivate</div>
            </div>

            {/* Service */}
            <div className="flex flex-col items-center">
                <span className={labelStyle}>Service</span>
                <div className={nodeStyle}>deactivateMember(memberId)</div>
            </div>

            {/* Repository */}
            <div className="flex flex-col items-center">
                <span className={labelStyle}>Repository</span>
                <div className={nodeStyle}>findById(), save()</div>
            </div>
        </div>
    );
}
