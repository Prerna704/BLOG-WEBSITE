// import { useEffect, useState } from "react";
// import BlogCard from "../components/BlogCard";

// export default function Home() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/blogs")
//       .then(res => res.json())
//       .then(data => setBlogs(data))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="grid">
//       {blogs.map((b, i) => (
//         <BlogCard key={i} blog={b} />
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.log("Fetch error:", err));
  }, []);

  return (
    <div className="container">
      <div className="grid">
        
        {blogs.map(blog => (
          <div className="card" key={blog._id}>
            <img
              src={blog.image}
              alt={blog.title}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
              }}
            />

            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <span>✍️ {blog.author}</span>
          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Home;
