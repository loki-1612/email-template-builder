import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Preview from "./Components/Preview";
import Editor from "./Components/Editor";
import { generateEmailHTML } from "./utils/exportHtml";
import ExportHtmlModal from "./Components/ExportHtmlModal";

export default function App() {
  // ===== Day 2: Blocks data =====
  const [blocks, setBlocks] = useState([]);

  // ===== Day 6: Selected block =====
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // ===== Day 5: Export HTML =====
  const [showExport, setShowExport] = useState(false);
  const [html, setHtml] = useState("");

  // ===== Day 6: Get selected block safely =====
  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) || null;

  // ===== Day 9: Saved templates (localStorage) =====
  const [templates, setTemplates] = useState(
    JSON.parse(localStorage.getItem("emailTemplates")) || []
  );

  // ===== Day 10: Reorder block =====
  const [dragIndex, setDragIndex] = useState(null);

  // ===== Day 6: Update block content =====
  const updateBlock = (value) => {
    if (!selectedBlockId) return;

    setBlocks((prev) =>
      prev.map((b) => (b.id === selectedBlockId ? { ...b, content: value } : b))
    );
  };

  // ===== Day 10: Reorder block =====
  const moveBlock = (from, to) => {
    if (from === to) return;

    setBlocks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  // ===== Day 9: Save template =====
  const saveTemplate = () => {
    if (blocks.length === 0) return;

    const newTemplate = {
      id: Date.now(),
      name: `Template ${templates.length + 1}`,
      blocks: blocks,
    };

    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem("emailTemplates", JSON.stringify(updatedTemplates));
  };

  // ===== Day 9: Load template =====
  const loadTemplate = (template) => {
    if (!template || !template.blocks) return;

    setBlocks(template.blocks);
    setSelectedBlockId(null);
  };

  // ===== Day 9: Delete template =====
  const deleteTemplate = (id) => {
    const updatedTemplates = templates.filter((t) => t.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem("emailTemplates", JSON.stringify(updatedTemplates));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          AI Email Template Builder
        </h1>

        <button
          onClick={() => {
            setHtml(generateEmailHTML(blocks));
            setShowExport(true);
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Export HTML
        </button>
      </div>

      {/* ===== Main Layout ===== */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Sidebar onAdd={setBlocks} />
        </div>

        {/* Preview */}
        <div className="col-span-6">
          <Preview
            blocks={blocks}
            onSelect={setSelectedBlockId}
            dragIndex={dragIndex}
            setDragIndex={setDragIndex}
            moveBlock={moveBlock}
          />
        </div>

        {/* Editor */}
        <div className="col-span-3">
          <Editor block={selectedBlock} onUpdate={updateBlock} />
        </div>
      </div>

      {/* ===== Day 9: Saved Templates Panel ===== */}
      <div className="mt-6 bg-white rounded-xl shadow border p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-slate-800">Saved Templates</h2>

          <button
            onClick={saveTemplate}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
          >
            Save Template
          </button>
        </div>

        {templates.length === 0 && (
          <p className="text-sm text-gray-500">No templates saved yet</p>
        )}

        <div className="flex flex-wrap gap-2">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="flex items-center gap-2 border rounded-md px-2 py-1 bg-slate-50"
            >
              <button
                onClick={() => loadTemplate(tpl)}
                className="text-sm hover:underline"
              >
                {tpl.name}
              </button>

              <button
                onClick={() => deleteTemplate(tpl.id)}
                className="text-red-500 text-xs hover:text-red-700"
                title="Delete template"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Export Modal ===== */}
      {showExport && (
        <ExportHtmlModal html={html} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}
