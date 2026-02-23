import React, { useState } from "react";

const ReportedPosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: "John", content: "Spam content here", status: "pending" },
    { id: 2, user: "Alice", content: "Offensive message", status: "pending" },
  ]);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleResolve = (id) => {
    const updated = posts.map((post) =>
      post.id === id ? { ...post, status: "resolved" } : post
    );
    setPosts(updated);
  };

  return (
    <div className="mt-10 bg-white  rounded-2xl shadow-sm p-6">
     <h2 className="text-xl font-semibold">
  Reported Posts
</h2>

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4 mb-6">

  {/* Search Input */}
  <input
    type="text"
    placeholder="Search reports..."
    className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />

  {/* Filter Dropdown */}
  <select
    className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option>All Status</option>
    <option>Pending</option>
    <option>Resolved</option>
  </select>

</div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
  <p className="text-gray-400 text-sm">
    No reported posts found.
  </p>
</div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between items-center border-b py-4"
          >
            <div>
              <p className="font-medium">{post.user}</p>
              <p className="text-gray-600 text-sm">{post.content}</p>
              <span
  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
    post.status === "resolved"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600"
  }`}
>
  {post.status.toUpperCase()}
</span>
            </div>

            <div className="flex gap-3">
              {post.status === "pending" && (
                <button
                  onClick={() => handleResolve(post.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Resolve
                </button>
              )}

              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReportedPosts;