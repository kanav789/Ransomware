import React, { useEffect, useState } from "react";
import "./signup.css";
import { auth } from "../../Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserName } from "../../Store/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LoadingBar from "../LoadingBar/LoadingBar";
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authuser) => {
      if (authuser) {
        setUser(authuser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);
  const signup = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      if (username == "" || email == "" || password == "") {
        toast.warning("All fields are required");
      }
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;

      // Update the user's profile
      await updateProfile(newUser, { displayName: username });
      dispatch(setUserName(username));
      toast.success("Account created Successfully");
      console.log("dispatch", username);

      // Redirect or perform other actions after successful signup
      setEmail("");
      setPassword("");
      setUser("");
      setLoading(false);

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      setLoading(false);
      // Handle error
    }
  };

  return (
    <div>
      <form className="signup" onSubmit={signup}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? <LoadingBar /> : <button type="submit">SigUp</button>}
      </form>
    </div>
  );
}

export default Signup;
