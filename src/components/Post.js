import React, { useState, useEffect } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API endpoint
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and extract the post data
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="post-container">
      <h1>Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{new Date(post.date).toLocaleDateString()}</p>
            <p>{post.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
