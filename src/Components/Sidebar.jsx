import { motion } from "framer-motion";

export default function Sidebar({ onAdd }) {
  const createBlock = (type, content) => ({
    id: Date.now() + Math.random(),
    type,
    content,
  });

  return (
    <div
      className="
        flex flex-row flex-wrap
        md:flex-col
        gap-3
        h-auto md:h-full
        bg-slate-900 rounded-xl shadow-lg text-white
        p-4
      "
    >
      <h2 className="w-full text-lg font-semibold tracking-wide text-center md:text-left">
        Blocks
      </h2>

      {/* TEXT BLOCK */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        onClick={() =>
          onAdd((prev) => [
            ...prev,
            createBlock("text", "This is a text block"),
          ])
        }
        className="
          w-full sm:w-[48%] md:w-full
          bg-slate-700 hover:bg-slate-600
          rounded-lg py-2.5 font-medium shadow-sm
          flex items-center justify-center gap-2
        "
      >
        ➕ Text
      </motion.button>

      {/* IMAGE BLOCK */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        onClick={() =>
          onAdd((prev) => [
            ...prev,
            createBlock("image", "https://via.placeholder.com/600x200"),
          ])
        }
        className="
          w-full sm:w-[48%] md:w-full
          bg-slate-700 hover:bg-slate-600
          rounded-lg py-2.5 font-medium shadow-sm
          flex items-center justify-center gap-2
        "
      >
        🖼 Image
      </motion.button>

      {/* BUTTON BLOCK */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        onClick={() =>
          onAdd((prev) => [...prev, createBlock("button", "Click me")])
        }
        className="
          w-full sm:w-[48%] md:w-full
          bg-slate-700 hover:bg-slate-600
          rounded-lg py-2.5 font-medium shadow-sm
          flex items-center justify-center gap-2
        "
      >
        🔘 Button
      </motion.button>
    </div>
  );
}
