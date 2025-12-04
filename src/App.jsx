import React from 'react';
import './App.css'
import RenderBlock from "./components/RenderBlock";
import Sidebar from './Components/Sidebar';
import Preview from './Components/Preview';

import { useState } from "react";

export default function App() {
  const [blocks, setBlocks] = useState([]);

  function addBlock(type) {
    const newBlock = {
      id: Date.now(),
      type,
      content:
        type === "text"
          ? "This is a text block"
          : type === "button"
          ? "Click Me"
          : "",
    };

    setBlocks((prev) => [...prev, newBlock]);
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar onAdd={addBlock} />
      <Preview blocks={blocks} />
    </div>
  );
}