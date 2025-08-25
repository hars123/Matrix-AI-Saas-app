import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-4 w-full text-sm bg-white border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md"
    >
      {/* Header row */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="font-medium text-slate-800">{item.prompt}</h2>
          <p className="text-gray-500 text-xs">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full text-xs"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide" : "View"}
        </button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="Generated"
              className="w-full max-w-md rounded-lg border"
            />
          ) : (
            <div className="mt-2 text-sm text-slate-700 prose max-w-full">
             <div className="reset-tw">
                 <Markdown>{item.content}</Markdown>
             </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
