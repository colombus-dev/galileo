import { PatternType } from "@/PatternType";

interface PatternTitleProps {
    currentPattern: PatternType;
}

export const PatternTitle: React.FC<PatternTitleProps> = ({ currentPattern }) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <h2 className="text-lg font-bold text-gray-800 leading-tight">{currentPattern.id}</h2>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide border bg-blue-50 text-blue-700 border-blue-200">
                {currentPattern.schema}
            </span>
        </div>
    );
};

export default PatternTitle;