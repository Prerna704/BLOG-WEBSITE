export default function CreateBlog() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    await fetch("http://localhost:5050/api/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    alert("Published ✨");
    e.target.reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-10 pt-32 pb-32 animate-fadeIn">
      <form onSubmit={submit} className="space-y-10">

        <input
          name="title"
          placeholder="Your title"
          className="w-full text-5xl font-bold bg-transparent outline-none 
                     text-luxHeading placeholder:text-luxMuted"
        />

        <input
          name="image"
          placeholder="Cover image URL"
          className="w-full border-b border-luxBorder pb-3 bg-transparent outline-none"
        />

        <textarea
          name="description"
          placeholder="Start writing..."
          className="w-full min-h-[360px] text-lg leading-relaxed 
                     bg-transparent outline-none placeholder:text-luxMuted"
        />

        <input
          name="author"
          placeholder="Author"
          className="w-1/3 border-b border-luxBorder pb-2 bg-transparent outline-none"
        />

        <button className="px-8 py-3 bg-luxAccent text-luxBg font-medium 
                           rounded-lg hover:bg-luxAccentHover 
                           transition shadow-lg shadow-emerald-500/30">
          Publish
        </button>
      </form>
    </div>
  );
}
