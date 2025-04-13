import AlgorithmNode from "./AlgorithmNode";

export default function AlgorithmConditional() {
    return (
        <div className="flex flex-col items-center">
            <AlgorithmNode label="CHECK_IS_ADMIN" />
            <div className="flex gap-4 mt-2">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">YES</span>
                    <AlgorithmNode label="THROW_ERROR" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">NO</span>
                    <AlgorithmNode label="DEACTIVATE_MEMBER" />
                    <AlgorithmNode label="SAVE_MEMBER" />
                    <AlgorithmNode label="SEND_NOTIFICATION" />
                </div>
            </div>
        </div>
    );
}
