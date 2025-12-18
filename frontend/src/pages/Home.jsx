import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import ExploreTopicsModal from "../components/ExploreTopicsModal";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showTopics, setShowTopics] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5050/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const scrollToBlogs = () => {
    document.getElementById("blogs")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-10 pt-40 pb-28 animate-fadeIn">
        <div className="flex flex-col items-center text-center">

          <h1 className="text-6xl font-bold leading-tight text-luxHeading max-w-4xl">
            Write with intention.
            <span className="block text-luxAccent mt-2">
              Read with clarity.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-luxMuted">
            A premium space for ideas that deserve attention.
          </p>

          {/* ACTIONS */}
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={scrollToBlogs}
              className="
                text-luxAccent
                font-medium
                hover:underline
                transition
              "
            >
              Explore stories
            </button>

            <button
              onClick={() => setShowTopics(true)}
              className="
                text-luxMuted
                font-medium
                hover:text-luxAccent
                transition
              "
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
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onRead={setSelectedBlog}
          />
        ))}
      </section>

      {/* BLOG MODAL */}
      <BlogModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* EXPLORE TOPICS MODAL */}
      <ExploreTopicsModal
        open={showTopics}
        onClose={() => setShowTopics(false)}
      />

    </div>
  );
}
