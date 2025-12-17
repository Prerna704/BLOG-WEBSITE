export default function BlogCard({ blog }) {
  return (
    <div className="card">
      <img src={blog.image} alt="" />
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <small>✍ {blog.author}</small>
    </div>
  );
}