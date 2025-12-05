import React from "react";
import "./App.css";
import RenderBlock from "./components/RenderBlock";
import Sidebar from "./Components/Sidebar";
import Preview from "./Components/Preview";
import { generateEmailHTML } from "./utils/exportHtml";
import ExportHtmlModal from "./Components/ExportHtmlModal";
import { useState } from "react";

export default function App() {
  // =========================
  // Day 2 – Blocks state
  // =========================
  const [blocks, setBlocks] = useState([]);

  // =========================
  // Day 5 – Export states
  // =========================
  const [showExport, setShowExport] = useState(false);
  const [html, setHtml] = useState("");

  // =========================
  // ✅ FIX: Add block handler
  // =========================
  const handleAddBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content:
        type === "text"
          ? "This is a text block"
          : type === "image"
          ? "https://via.placeholder.com/600x200"
          : "Click Me",
    };

    setBlocks((prev) => [...prev, newBlock]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          {/* ✅ PASS FUNCTION */}
          <Sidebar onAdd={handleAddBlock} />
        </div>

        {/* Preview */}
        <div className="col-span-9">
          <Preview blocks={blocks} />

          {/* Export Button */}
          <button
            onClick={() => {
              setHtml(generateEmailHTML(blocks));
              setShowExport(true);
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Export HTML
          </button>
        </div>
      </div>

      {showExport && (
        <ExportHtmlModal
          html={html}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}