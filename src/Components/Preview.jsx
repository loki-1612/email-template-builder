import { motion } from "framer-motion";

export default function Preview({
  blocks,
  onSelect,
  selectedBlockId,
  dragIndex,
  setDragIndex,
  moveBlock,
  deleteBlock,
}) {
  return (
    <div className="bg-slate-100 p-6 rounded-xl h-full">
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">Email Preview</h2>

        {blocks.length === 0 && (
          <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center text-slate-500 text-sm">
            Add blocks from the sidebar to start building your email
          </div>
        )}

        {blocks.map((block, index) => {
          const isSelected = block.id === selectedBlockId;

          const wrapperProps = {
            draggable: true,
            onDragStart: () => setDragIndex(index),
            onDragOver: (e) => e.preventDefault(),
            onDrop: () => moveBlock(dragIndex, index),
            onClick: () => onSelect(block.id),
            onMouseDown: (e) => e.stopPropagation(),
            className: `relative group cursor-grab active:cursor-grabbing transition-all rounded-lg border
              ${
                isSelected
                  ? "bg-blue-50 border-blue-400 shadow-sm"
                  : "border-slate-200 hover:bg-slate-50"
              }
            `,
          };

          const DeleteButton = (
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                deleteBlock(block.id);
              }}
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100
  bg-white border border-slate-300 text-slate-500
  rounded-full w-7 h-7 flex items-center justify-center
  shadow-sm hover:text-red-600 hover:border-red-300 hover:bg-red-50
  transition"
              title="Delete block"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4a1 1 0 011 1v1H9V5a1 1 0 011-1z"
                />
              </svg>
            </motion.button>
          );

          // TEXT BLOCK
          if (block.type === "text") {
            return (
              <motion.div
                key={block.id}
                {...wrapperProps}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={`${wrapperProps.className} p-3 text-slate-700`}
              >
                {DeleteButton}
                <p className="whitespace-pre-wrap">{block.content}</p>
              </motion.div>
            );
          }

          // IMAGE BLOCK
          if (block.type === "image") {
            return (
              <motion.div
                key={block.id}
                {...wrapperProps}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className={`${
                  wrapperProps.className
                } h-32 flex items-center justify-center text-sm
                  ${
                    isSelected
                      ? "bg-blue-50"
                      : "bg-slate-200 hover:bg-slate-300"
                  }
                `}
              >
                {DeleteButton}
                Image Placeholder
              </motion.div>
            );
          }

          // BUTTON BLOCK
          if (block.type === "button") {
            return (
              <motion.div
                key={block.id}
                {...wrapperProps}
                className={`${wrapperProps.className} flex justify-center p-3`}
              >
                {DeleteButton}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`px-4 py-2 rounded-lg font-medium shadow-sm
                    ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }
                  `}
                >
                  {block.content}
                </motion.button>
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
