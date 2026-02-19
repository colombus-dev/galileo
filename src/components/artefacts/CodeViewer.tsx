import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export interface CodeViewerProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  lineProps?:
    | React.HTMLAttributes<HTMLElement>
    | ((lineNumber: number) => React.HTMLAttributes<HTMLElement>);
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = "python",
  className = "",
	showLineNumbers = true,
	wrapLines,
	lineProps,
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
		showLineNumbers={showLineNumbers}
		wrapLines={wrapLines}
		lineProps={lineProps as never}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);