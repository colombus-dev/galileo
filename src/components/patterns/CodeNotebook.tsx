interface CodeNotebookProps {
    titleCode: string;
    code: string;
}

export const CodeNotebook: React.FC<CodeNotebookProps> = ({
    titleCode,
    code
}) => {
    return (
        <div className="mt-4 rounded-lg bg-slate-900 shadow-xl overflow-hidden border border-slate-800 text-left">

            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-slate-500 font-mono">{titleCode}</span>
            </div>

            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-6 text-slate-300">
                    <code>
                        {`${code}`}
                    </code>
                </pre>
            </div>
        </div>
    );
}


