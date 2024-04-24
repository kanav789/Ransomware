import React, { useState } from "react";
import { auth } from "../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import { setUserName } from "../../Store/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBar from "../LoadingBar/LoadingBar";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function login(event) {
    try {
      setLoading(true);
      event.preventDefault();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const username = userCredentials.user.displayName;
      dispatch(setUserName(username));
      toast.success("Logged in successfully");
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error("Your Email and Password are incorrect");
      setLoading(false);
    }
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
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
        {loading ? <LoadingBar /> : <button type="submit">SigIn</button>}

        <p>
          If you are not register yet please{" "}
          <Link to="/signup" className="text-blue-700">
            Register
          </Link>{" "}
          here
        </p>
      </form>
    </div>
  );
}

export default Login;
