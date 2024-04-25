import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/userSlice";
import { selectUser } from "../../Store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImHome } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";

import Avatar from "@mui/material/Avatar";
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(selectUser);

  const handlelogout = async () => {
    try {
      await signOut(auth).then(() => {
        dispatch(logout());
        toast("Logged Out Successfully");
        navigate("/login");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="sidebar">
        <div className="logo ">
          {/* //   <img src="/images/instagram-text-icon.svg" alt="" /> */}
          <h4>Ransomware121</h4>

        
        </div>

        <div className="right">
          <li>
            <Link to="/" className="white">
              <ImHome /> Home
            </Link>
          </li>

          {username ? (
            <>
              <li>
                <Link onClick={handlelogout} className="white">
                  <IoLogOut /> Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="white">
                  Login
                </Link>
              </li>
            </>
          )}

          <li>
            {" "}
            <Link to="/addpost" className="white">
              +Add Post
            </Link>
          </li>
          <li>
            {" "}
            <Link aria-disabled className="white">
              <Avatar className="post_avatar" alt="kanu" />{" "}
              {username ? username : "Guest"}
            </Link>
          </li>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
