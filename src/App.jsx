import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Preview from "./Components/Preview";
import Editor from "./Components/Editor";
import { generateEmailHTML } from "./utils/exportHtml";
import ExportHtmlModal from "./Components/ExportHtmlModal";
import { motion } from "framer-motion";

export default function App() {
  // Core blocks state
  const [blocks, setBlocks] = useState([]);

  // Currently Selected block
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Export modal state
  const [showExport, setShowExport] = useState(false);
  const [html, setHtml] = useState("");

  // Selected block reference
  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) || null;

  // Saved templates (persisted)
  const [templates, setTemplates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("emailTemplates")) || [];
    } catch {
      return [];
    }
  });

  // Drag & Drop index
  const [dragIndex, setDragIndex] = useState(null);

  // Update selected block content
  const updateBlock = (value) => {
    if (!selectedBlockId) return;

    setBlocks((prev) =>
      prev.map((b) => (b.id === selectedBlockId ? { ...b, content: value } : b))
    );
  };

  // Reorder blocks
  const moveBlock = (from, to) => {
    if (from === null || to === null || from === to) return;

    setBlocks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  // Delete block
  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    setSelectedBlockId(null);
  };

  // Save current template
  const saveTemplate = () => {
    if (blocks.length === 0) return;

    const newTemplate = {
      id: Date.now(),
      name: `Template ${templates.length + 1}`,
      blocks: JSON.parse(JSON.stringify(blocks)),
    };

    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem("emailTemplates", JSON.stringify(updated));
  };

  // Load template
  const loadTemplate = (template) => {
    if (!template || !template.blocks) return;
    setBlocks(template.blocks);
    setSelectedBlockId(null);
  };

  // Delete template
  const deleteTemplate = (id) => {
    const updated = templates.filter((t) => t.id !== id);
    setTemplates(updated);
    localStorage.setItem("emailTemplates", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow border p-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            AI Email Template Builder
          </h1>

          <button
            onClick={() => {
              setHtml(generateEmailHTML(blocks));
              setShowExport(true);
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Export HTML
          </button>
        </div>

        {/* Main Layout */}
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
              deleteBlock={deleteBlock}
              selectedBlockId={selectedBlockId}
            />
          </div>

          {/* Editor */}
          <div className="col-span-3">
            <Editor block={selectedBlock} onUpdate={updateBlock} />
          </div>
        </div>

        {/* Saved Templates */}
        <div className="bg-white rounded-xl shadow border p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-slate-800">Saved Templates</h2>

            <button
              onClick={saveTemplate}
              className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Save Template
            </button>
          </div>

          {templates.length === 0 && (
            <p className="text-sm text-gray-500">No templates saved yet</p>
          )}

          <div className="flex flex-wrap gap-3">
            {templates.map((tpl) => (
              <motion.div
                key={tpl.id}
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 bg-white border border-slate-300
        rounded-lg px-3 py-2 shadow-sm cursor-pointer
        hover:shadow-md hover:border-indigo-400"
              >
                {/* Template Load Button */}
                <button
                  onClick={() => loadTemplate(tpl)}
                  className="text-sm font-medium text-slate-700
          focus:outline-none"
                >
                  {tpl.name}
                </button>

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTemplate(tpl.id);
                  }}
                  className="text-red-500 text-xs font-bold
          hover:text-red-700 focus:outline-none"
                  title="Delete template"
                >
                  ✕
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Export Modal */}
        {showExport && (
          <ExportHtmlModal html={html} onClose={() => setShowExport(false)} />
        )}
      </div>
    </div>
  );
}
