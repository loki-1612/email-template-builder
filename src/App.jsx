import React from 'react';
import './App.css'

import { useState } from "react";

export default function App() {
  const [blocks] = useState([
    {
      id: 1,
      type: "text",
      content: "Welcome to our newsletter",
    },
    {
      id: 2,
      type: "image",
      content: "https://via.placeholder.com/600x200",
    },
    {
      id: 3,
      type: "button",
      content: "Read More",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white border border-gray-300 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          AI Email Template Builder
        </h1>

        <p className="text-gray-700 mb-6">
          Below is the block data stored in React state.
        </p>

        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="bg-gray-50 border border-gray-200 rounded-md p-4"
            >
              <div className="mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  Block Type:
                </span>
                <span className="ml-2 text-gray-800 capitalize">
                  {block.type}
                </span>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-600">
                  Content:
                </span>
                <p className="mt-1 text-gray-800 break-words">
                  {block.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
