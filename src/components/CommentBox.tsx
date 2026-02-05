import React from "react";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

export interface CommentBoxProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}

export const CommentBox: React.FC<CommentBoxProps> = ({
  value = "",
  placeholder = "Ajouter un commentaire sur cet artefact...",
  onChange,
  className = "",
  label = "Commentaires sur cet artefact",
}) => (
  <div className={`bg-[#f7fafd] rounded-b-2xl rounded-t-xl px-6 pt-4 pb-5 border-0 max-w-md ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <MdOutlineChatBubbleOutline className="text-slate-500 text-xl" />
      <span className="font-medium text-slate-700 text-base">{label}</span>
    </div>
    <input
      type="text"
      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-400 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition shadow-sm"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      style={{ fontSize: 16 }}
    />
  </div>
);
