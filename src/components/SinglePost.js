import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch the individual post based on the ID
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and extract the post data
        setPost(data.post);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // Fetch the comments for the post
    fetch(`http://localhost:3000/api/posts/${id}/comments`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Handle the response and extract the comments data
        setComments(data.comments);
      })
      .catch((error) => {
        if (error.status === "No comments found for the post") {
          // Handle the case when comments are not found
          setComments([]);
        } else {
          console.error("Error fetching comments:", error);
        }
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{post.content}</p>
      <p>Date: {new Date(post.date).toLocaleDateString()}</p>

      <h3>Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <p>{comment.content}</p>
            <p>By: {comment.user}</p>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default SinglePost;
