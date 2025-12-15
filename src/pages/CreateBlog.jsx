export default function CreateBlog() {
  const submit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await fetch("http://localhost:5000/api/blogs/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Blog Created");
  };

  return (
    <form onSubmit={submit}>
      <input name="title" placeholder="Title" />
      <input name="image" placeholder="Image URL" />
      <textarea name="description" placeholder="Description" />
      <input name="author" placeholder="Author" />
      <button>Create</button>
    </form>
  );
}


// export default function CreateBlog() {
//   return <h1 style={{ padding: 40 }}>Create Blog</h1>;
// }
