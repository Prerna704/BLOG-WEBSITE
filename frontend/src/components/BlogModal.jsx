import { useState, useEffect } from "react";

export default function BlogModal({ blog, onClose }) {
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightPos, setHighlightPos] = useState({ x: 0, y: 0 });
  const [rangeRef, setRangeRef] = useState(null);

  // Cleanup on unmount (IMPORTANT)
  useEffect(() => {
    return () => {
      window.getSelection()?.removeAllRanges();
      setShowHighlight(false);
      setRangeRef(null);
    };
  }, []);

  if (!blog) return null;

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      setShowHighlight(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setRangeRef(range);
    setHighlightPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });

    setShowHighlight(true);
  };

  const applyHighlight = () => {
    if (!rangeRef) return;

    const span = document.createElement("span");
    span.style.backgroundColor = "#fde68a";
    span.style.color = "#1f2937";
    span.style.padding = "2px 4px";
    span.style.borderRadius = "4px";

    span.appendChild(rangeRef.extractContents());
    rangeRef.insertNode(span);

    setShowHighlight(false);
    setRangeRef(null);
    window.getSelection().removeAllRanges();
  };

  const handleClose = () => {
    window.getSelection()?.removeAllRanges();
    setShowHighlight(false);
    setRangeRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div
        className="
          bg-luxSurface
          max-w-3xl w-full
          max-h-[90vh] overflow-y-auto
          rounded-2xl
          p-6
          relative
        "
      >
        {/* IMAGE + CLOSE */}
        <div className="relative h-48 w-full overflow-hidden rounded-xl mb-6">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover"
          />

          <button
            onClick={handleClose}
            className="
              absolute top-3 right-3
              bg-black/60 text-white
              rounded-full
              w-9 h-9
              flex items-center justify-center
              hover:bg-black/80
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* BLOG CONTENT */}
        <h1 className="text-3xl font-bold text-luxHeading">
          {blog.title}
        </h1>

        <div
          className="mt-6 text-luxText leading-relaxed cursor-text select-text"
          onMouseUp={handleTextSelect}
        >
          {blog.description}
        </div>
      </div>

      {/* FLOATING HIGHLIGHT BUTTON */}
      {showHighlight && (
        <button
          style={{
            top: highlightPos.y,
            left: highlightPos.x,
            transform: "translate(-50%, -100%)",
          }}
          className="
            fixed z-50
            bg-luxAccent text-black
            px-4 py-1 rounded-full
            text-sm font-medium
            shadow-lg
            hover:opacity-90
            transition
          "
          onClick={applyHighlight}
        >
          Highlight
        </button>
      )}
    </div>
  );
}
