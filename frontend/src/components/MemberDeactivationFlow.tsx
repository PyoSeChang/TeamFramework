import AlgorithmNode from "./AlgorithmNode";
import AlgorithmConditional from "./AlgorithmConditional";

export default function MemberDeactivationFlow() {
    return (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <AlgorithmNode label="START" />
            <AlgorithmNode label="FIND_MEMBER" />
            <AlgorithmConditional />
        </div>
    );
}
