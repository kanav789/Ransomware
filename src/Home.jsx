import { useEffect, useState } from "react";
import { db } from "./Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import "./App.css";
import Post from "./components/post/Post";
import { selectUser } from "./Store/userSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "asc")),
      (snapshot) => {
        const postData = [];
        snapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postData);
      }
    );

    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);

  const user = useSelector(selectUser);

  return (
    <>
      {user ? (
        <div className="app">
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              comments={post.comments} // Pass comments to Post component
            />
          ))}
        </div>
      ) : (
        <Link to="/login">
          <h1 className="pleaseLogin">Please Login</h1>
        </Link>
      )}
    </>
  );
}

export default Home;
