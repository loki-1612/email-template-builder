import React from "react";

export default function RenderBlock({ block }) {
  if (!block) return null;

  switch (block.type) {
    case "text":
      return (
        <p className="text-slate-700 text-base leading-relaxed">
          {block.content}
        </p>
      );

    case "image":
      return (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 w-full flex justify-center">
          <img
            src={block.content}
            alt="Email Banner"
            className="w-full max-w-md h-48 object-cover rounded-md"
          />
        </div>
      );

    case "button":
      return (
        <div>
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-medium">
            {block.content}
          </button>
        </div>
      );

    default:
      return null;
  }
}
