import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface CodeViewerProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = "python",
  className = "",
}) => (
  <div
    className={`w-full rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 ${className}`}
  >
    <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
      <span className="text-green-400 font-mono text-xs">Python</span>
    </div>
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        background: "transparent",
        fontSize: 15,
        padding: "1.2em",
        borderRadius: 0,
      }}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  </div>
);