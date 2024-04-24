import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";

import { db } from "../../Firebase";
import { addDoc, collection, query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { selectUser } from "../../Store/userSlice";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { doc, deleteDoc } from "firebase/firestore";
import LoadingBar from "../LoadingBar/LoadingBar";
function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  //
  //
  //
  //
  //
  //
  //
  //
  // for commenting on a post
  useEffect(() => {
    try {
      const subscribe = onSnapshot(
        query(
          collection(db, `posts/${postId}/comments`),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          console.log("Snapshot:", snapshot.docs);
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
      return () => subscribe();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (commentInput === "") {
      toast.error("Please write a comment");
    }
    try {
      const docRef = await addDoc(collection(db, `posts/${postId}/comments`), {
        text: commentInput,
        username: user,
        timestamp: new Date(),
      });
      toast.success("comment added");
      console.log("Comment added with ID: ", docRef.id);
      setCommentInput("");
      setComments((prevComments) => [
        ...prevComments,
        {
          id: docRef.id,
          text: commentInput,
          username: user,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  //
  //
  //
  //
  //
  //
  //
  // commentsdropdown
  const [isvisible, setIsVisible] = useState(false);
  function commentdropdown() {
    try {
      setIsVisible(!isvisible);
      console.log("hello");
    } catch (error) {
      console.log(error);
    }
  }
  //
  //
  //
  //
  //
  //
  // delete post
  async function deletePost() {
    try {
      if (user === username) {
        setLoading(true);
        await deleteDoc(doc(db, "posts", postId));
        toast.success("Post Deleted");
      } else {
        toast.warning("You don't have access to delete this");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      <div className="post-box">
        <div className="post">
          {/* post header */}
          <div className="post_header ">
            <div className="leftpost flex items-center">
              {" "}
              <Avatar className="post_avatar" alt="kanu" />
              <h3>{username}</h3>
            </div>
            <div className="rightpost ">
              {loading ? (
                <LoadingBar />
              ) : (
                <AiTwotoneDelete onClick={deletePost} />
              )}
            </div>
          </div>
          {/* {postlower} */}
          <img className="post_image" src={imageUrl} alt="" />
          <div className="social">
            {/* <div className="like">
              <BiLike />
            </div> */}
          </div>

          <div className="post-text">
            <span>{username}: </span> {caption}
          </div>
          <form onSubmit={submit} className="comment">
            <input
              type="text"
              placeholder="comment here...."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
          {/* Render Comments */}
          <div className="comments-section ">
            <div className="comments-show ">
              {" "}
              <h4>Comments:</h4>{" "}
              <h4>
                {" "}
                <BsThreeDots onClick={commentdropdown} />
              </h4>
            </div>
            <div className={` ${isvisible ? "visible" : "invisiblecomment"}`}>
              {comments.map((comment, index) => (
                <div key={index} className="inlinecomment">
                  <strong>{comment.username}: </strong> {comment.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
