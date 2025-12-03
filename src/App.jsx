import React from 'react';
import './App.css'
import { useState } from "react";
import RenderBlock from "./components/RenderBlock";

export default function App() {
  const blocks = [
    {
      id: 1,
      type: "text",
      content: "Welcome to our newsletter. Stay updated with our latest news.",
    },
    {
      id: 2,
      type: "image",
      content: "https://picsum.photos/seed/email/600x240",
    },
    {
      id: 3,
      type: "button",
      content: "Read More",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start p-8">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">
            AI Email Template Builder
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Preview how your email content will look
          </p>
        </div>

        <div className="space-y-4">
          {blocks.map((block) => (
            <RenderBlock key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
