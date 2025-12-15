<<<<<<< HEAD

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import ExploreTopicsModal from "../components/ExploreTopicsModal";

=======
import { useEffect, useState } from "react";

>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all blogs
  useEffect(() => {
    fetch("http://localhost:5050/api/blogs")
<<<<<<< HEAD
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => {
        console.error(err);
        setError("Could not load blogs");
      });
  }, []);

  // Scroll to blogs section
  const scrollToBlogs = () => {
    document.getElementById("blogs")?.scrollIntoView({
      behavior: "smooth",

    });
  };

  // Delete blog
  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`http://localhost:5050/api/blogs/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete blog");
    }
  };

  return (
    <div>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 pt-40 pb-28 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold leading-tight text-luxHeading max-w-4xl">
            Write with intention.
            <span className="block text-luxAccent mt-2">Read with clarity.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-luxMuted">
            A premium space for ideas that deserve attention.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={scrollToBlogs}
              className="text-luxAccent font-medium hover:underline transition"
            >
              Explore stories
            </button>

            <button
              onClick={() => setShowTopics(true)}
              className="text-luxMuted font-medium hover:text-luxAccent transition"
            >
              Explore topics
            </button>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="max-w-7xl mx-auto px-10 mb-12">
        <div className="h-px bg-luxBorder/50"></div>
      </div>

      {/* BLOG GRID */}
      <section
        id="blogs"

        className="max-w-7xl mx-auto px-10 pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {/* {error && (
          <p className="col-span-full text-center text-luxMuted">
            {error}
          </p>
        )} */}
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            isOwner={true}
            onRead={() => setSelectedBlog(blog)}
            onEdit={() => navigate(`/edit/${blog._id}`)}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </section>

      {/* BLOG MODAL */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}

      {/* EXPLORE TOPICS MODAL */}
      {showTopics && (
        <ExploreTopicsModal
          open={showTopics}
          onClose={() => setShowTopics(false)}
        />
      )}
    </div>
  );
}

=======
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
>>>>>>> c092f4b (✨ Major UI redesign: elegant dark theme, Tailwind, animations)
