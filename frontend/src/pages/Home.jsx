import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 pt-32 pb-24 animate-fadeIn">
        <h1 className="text-6xl font-bold leading-tight text-luxHeading max-w-4xl">
          Write with intention.  
          <span className="block text-luxAccent">Read with clarity.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-luxMuted">
          A premium space for ideas that deserve attention.
        </p>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-7xl mx-auto px-10 pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, i) => (
          <article
            key={blog._id}
            style={{ animationDelay: `${i * 80}ms` }}
            className="bg-luxSurface border border-luxBorder rounded-xl p-6 
                       hover:-translate-y-2 hover:shadow-xl 
                       hover:shadow-emerald-500/10 
                       transition-all duration-300 animate-slideUp"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="h-48 w-full object-cover rounded-lg mb-5"
            />

            <h2 className="text-xl font-semibold text-luxHeading">
              {blog.title}
            </h2>

            <p className="mt-2 text-sm text-luxText line-clamp-3">
              {blog.description}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-luxAccent font-medium">
                {blog.author}
              </span>
              <span className="text-xs text-luxMuted">Read →</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}