// Post.js
import React, { useState } from "react";

function Post({ postId, username, caption, imageUrl }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src="https://via.placeholder.com/40"
          alt="Avatar"
        />
        <h3 className="font-bold">{username}</h3>
      </div>
      <img className="w-full mb-2" src={imageUrl} alt="Post" />
      <p className="text-gray-700">{caption}</p>
      <div className="mt-2">
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          onClick={toggleComments}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && (
          <div className="mt-2">
            {/* Render comments here */}
            <p>Comment 1</p>
            <p>Comment 2</p>
            <p>Comment 3</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
