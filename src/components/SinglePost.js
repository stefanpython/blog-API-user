import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

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

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the new comment to the API
    fetch(`http://localhost:3000/api/posts/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newComment, user: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and update the comments
        const updatedComments = comments
          ? [...comments, data.comment]
          : [data.comment];

        setComments(updatedComments);
        setNewComment("");
        setName("");
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // Reverse comments order
  const sortedComments =
    comments && comments.length > 0 ? [...comments].reverse() : [];

  return (
    <div className="comment-container">
      <h1>{post.authorName}</h1>
      <p className="post-comment">{post.content}</p>
      <p>
        Date:
        {new Date(post.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>

      <h3>Comments</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="comment-form__input"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={handleNameChange}
        />
        <textarea
          className="comment-form__textarea"
          placeholder="Write your comment..."
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>

        <button className="comment-form__button" type="submit">
          Submit
        </button>
      </form>

      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <div className="comment-content" key={comment._id}>
            <p>{comment.content}</p>
            <p>By: {comment.user}</p>
            <p>
              Posted at:
              {new Date(comment.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default SinglePost;
