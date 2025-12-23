import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); // { email, name, ... }

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5050/api/blogs/myblogs/${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch your blogs");
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => {
        console.error(err);
        setError("Could not load your blogs");
      });
  }, [navigate, user]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5050/api/blogs/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email }),
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete blog");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-10 py-20">
      <h2 className="text-3xl font-bold text-luxHeading mb-10">My Blogs</h2>

      {error && <p className="text-luxMuted mb-6">{error}</p>}

      {blogs.length === 0 && !error && (
        <p className="text-luxMuted">You haven’t published any blogs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id || blog.title}
            blog={blog}
            isOwner={true}
            onRead={() => navigate(`/blog/${blog._id}`)}
            onEdit={() => navigate(`/edit/${blog._id}`)}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </div>
    </div>
  );
}
