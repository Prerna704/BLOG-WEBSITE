import { useState, useRef } from "react";

export default function CreateBlog() {
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const formRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    // VALIDATION
    if (!data.title || data.title.trim().length < 5) {
      setError("Title must be at least 5 characters long.");
      return;
    }

    if (!data.description || data.description.trim().length < 50) {
      setError("Blog content must be at least 50 characters long.");
      return;
    }

    setError("");

    await fetch("http://localhost:5050/api/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Published ✨");
    formRef.current.reset();
  };

  const deleteDraft = () => {
    formRef.current.reset();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-luxBg flex justify-center px-6 pt-28 pb-32 animate-fadeIn">

      <form
        ref={formRef}
        onSubmit={submit}
        className="
          w-full max-w-3xl
          bg-luxSurface
          border border-luxBorder
          rounded-2xl
          p-10
          space-y-10
          shadow-xl shadow-black/20
        "
      >
        {/* TITLE */}
        <input
          name="title"
          placeholder="Your title"
          className="
            w-full
            text-5xl font-bold
            bg-transparent outline-none
            text-luxHeading
            placeholder:text-luxMuted
          "
        />

        {/* COVER IMAGE */}
        <input
          name="image"
          placeholder="Cover image URL"
          className="
            w-full
            border-b border-luxBorder pb-3
            bg-transparent outline-none
            text-luxText
            placeholder:text-luxMuted
          "
        />

        {/* CONTENT */}
        <textarea
          name="description"
          placeholder="Start writing..."
          className="
            w-full min-h-[360px]
            text-lg leading-relaxed
            bg-transparent outline-none resize-none
            text-luxText
            placeholder:text-luxMuted
          "
        />

        {/* AUTHOR */}
        <input
          name="author"
          placeholder="Author"
          className="
            w-1/3
            border-b border-luxBorder pb-2
            bg-transparent outline-none
            text-luxText
            placeholder:text-luxMuted
          "
        />

        {/* ACTIONS */}
        <div className="pt-6 flex gap-4">
          <button
            type="submit"
            className="
              px-8 py-3
              bg-luxAccent text-black
              font-medium
              rounded-full
              hover:opacity-90
              transition
              shadow-lg shadow-emerald-500/20
            "
          >
            Publish
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="
              px-6 py-3
              border border-luxBorder
              text-luxMuted
              rounded-full
              hover:text-red-400 hover:border-red-400
              transition
            "
          >
            Delete draft
          </button>
        </div>
      </form>

      {/* ERROR MODAL */}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setError("")}
          />
          <div className="relative bg-luxSurface border border-luxBorder rounded-2xl p-6 w-full max-w-sm z-10">
            <h3 className="text-lg font-semibold text-luxHeading mb-2">
              Cannot publish blog
            </h3>
            <p className="text-sm text-luxMuted mb-6">{error}</p>
            <button
              onClick={() => setError("")}
              className="w-full bg-luxAccent text-black py-2 rounded-full font-medium"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-luxSurface border border-luxBorder rounded-2xl p-6 w-full max-w-sm z-10">
            <h3 className="text-lg font-semibold text-luxHeading mb-2">
              Delete draft?
            </h3>
            <p className="text-sm text-luxMuted mb-6">
              This will clear everything you’ve written.
            </p>
            <div className="flex gap-3">
              <button
                onClick={deleteDraft}
                className="flex-1 bg-red-500 text-white py-2 rounded-full"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 border border-luxBorder py-2 rounded-full text-luxMuted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
