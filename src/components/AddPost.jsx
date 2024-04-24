import React, { useState } from "react";
import { db, storage } from "../Firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { selectUser } from "../Store/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddPost.css";
import LoadingBar from "./LoadingBar/LoadingBar";

function AddPost() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [caption, setCaption] = useState("");

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) {
        alert("Please select an image.");
        return;
      }
      setLoading(true);
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = await uploadBytes(storageRef, image);

      const imageUrl = await getDownloadURL(uploadTask.ref);

      // Add the caption and image URL to Firestore
      const docRef = await addDoc(collection(db, "posts"), {
        username: user || user.displayName,
        caption: caption,
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      toast.success("post added sucessfully");
      navigate("/");

      // Reset form fields after successful upload
      setCaption("");
      setLoading(false);
      setImage(null);
    } catch (error) {
      toast.error("Error uploading image: ", error);
      toast.warning("An error occurred while uploading the image.");
      setLoading(false);
    }
  };

  return (
    <div className="addpost">
      {/* <AuthLayout> */}
      <h1>Add Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadImage();
        }}
        className="upload"
      >
        <input
          type="text"
          placeholder="Enter the Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input type="file" onChange={handleChange} />

        {loading ? <LoadingBar /> : <button type="submit">Upload</button>}
      </form>
      {/* </AuthLayout> */}
    </div>
  );
}

export default AddPost;
