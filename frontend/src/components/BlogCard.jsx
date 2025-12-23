// import { useEffect, useState, useRef } from "react";

// export default function BlogCard({ blog, onRead, isOwner = false }) {
//   const [saved, setSaved] = useState(false);
//   const [toast, setToast] = useState("");
//   const toastTimer = useRef(null);

//   // Check saved state on load
//   useEffect(() => {
//     if (!blog?._id) return;

//     const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
//     setSaved(savedBlogs.includes(blog._id));

//     return () => {
//       if (toastTimer.current) {
//         clearTimeout(toastTimer.current);
//       }
//     };
//   }, [blog?._id]);

//   const showToast = (message) => {
//     setToast(message);

//     if (toastTimer.current) {
//       clearTimeout(toastTimer.current);
//     }

//     toastTimer.current = setTimeout(() => {
//       setToast("");
//     }, 2000);
//   };

//   const toggleSave = (e) => {
//     e.stopPropagation(); // IMPORTANT: prevent opening modal

//     if (!blog?._id) return;

//     const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];

//     if (saved) {
//       const updated = savedBlogs.filter(id => id !== blog._id);
//       localStorage.setItem("savedBlogs", JSON.stringify(updated));
//       setSaved(false);
//       showToast("Removed from saved");
//     } else {
//       localStorage.setItem(
//         "savedBlogs",
//         JSON.stringify([...savedBlogs, blog._id])
//       );
//       setSaved(true);
//       showToast("Saved ✓");
//     }
//   };

//   return (
//     <article
//       className="
//         relative
//         bg-luxSurface
//         border border-luxBorder
//         rounded-2xl
//         overflow-hidden
//         flex flex-col
//         h-full
//         shadow-md shadow-black/30
//         transition-all duration-300
//         hover:-translate-y-1
//         hover:shadow-xl hover:shadow-emerald-500/20
//       "
//     >
//       {/* TOAST */}
//       {toast && (
//         <div className="absolute top-3 right-3 bg-luxSurface border border-luxBorder px-3 py-1 rounded-md text-xs text-luxAccent shadow-lg z-10">
//           {toast}
//         </div>
//       )}

//       {/* CLICKABLE AREA */}
//       <div onClick={() => onRead(blog)} className="cursor-pointer">
//         <div className="h-52 w-full bg-black/20 overflow-hidden">
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.src = "https://picsum.photos/600/400";
//             }}
//           />
//         </div>

//         <div className="p-6 pb-4">
//           <h3 className="text-xl font-semibold text-luxHeading">
//             {blog.title}
//           </h3>

//           <p className="mt-2 text-sm text-luxText line-clamp-3">
//             {blog.description}
//           </p>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="px-6 pb-4 flex justify-between items-center text-sm text-luxMuted">
//         <span className="text-luxAccent font-medium">
//           ✍ {blog.author}
//         </span>

//         <button
//           onClick={toggleSave}
//           className={`transition ${
//             saved ? "text-luxAccent" : "hover:text-luxAccent"
//           }`}
//         >
//           {saved ? "Saved" : "Save"}
//         </button>
//       </div>
//     </article>
//   );
// }
// /****************************************************** */



import React from "react";

export default function BlogCard({ blog, onRead, onEdit, onDelete, isOwner }) {
  if (!blog) return null;

  const { title = "Untitled", description = "", image } = blog;

  return (
    <article
      className="
        relative
        bg-luxSurface
        border border-luxBorder
        rounded-2xl
        overflow-hidden
        flex flex-col
        h-full
        shadow-md shadow-black/30
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-emerald-500/20
      "
    >
    <div className="bg-luxSurface border border-luxBorder rounded-2xl overflow-hidden shadow-lg shadow-black/10 flex flex-col">
      {/* Blog image */}
      {image ? (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-luxBorder flex items-center justify-center text-luxMuted">
          No Image
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-luxHeading mb-2">{title}</h3>

        {/* Description preview */}
        <p className="text-luxMuted text-sm flex-1">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onRead(blog)}
            className="text-luxAccent font-medium hover:underline transition"
          >
            Read
          </button>

          {isOwner && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit(blog)}
                className="text-luxMuted hover:text-luxAccent transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </article>
  );
}
