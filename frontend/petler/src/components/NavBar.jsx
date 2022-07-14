import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { atom, useAtom, Provider } from "jotai";
import { userAtom } from "../App";
import jwtDecode from "jwt-decode";

function Navbar() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/home");
    alert("Logging Out");
    localStorage.clear();
    window.location.reload();
  };

  // const decodedToken = jwtDecode(localStorage.getItem("token"))
  const vId = user?.vendorId;
  const uId = user?.userId;

  let role = "";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
  }

  if (!token) {
    return (
      <div className="navBar">
        <Link className="logo" to="/home">
          <img src="https://i.imgur.com/QwI6oUK.png" />{" "}
        </Link>
        <Link className="navBarText" to="/vendor/login">
          Join us as vendor
        </Link>
        <Link className="navBarText" to="/user/signup">
          Signup
        </Link>
        <Link className="navBarText" to="/user/login">
          Login
        </Link>
        {localStorage.getItem("token") && <p onClick={handleLogout}>LogOut</p>}
      </div>
    );
  } else if (role === "user") {
    return (
      <div className="navBar">
        <Link className="logo" to="/home">
          <img src="https://i.imgur.com/QwI6oUK.png" />{" "}
        </Link>
        <Link className="navBarText" to="/user/profile">
          Profile
        </Link>
        <div
          onClick={handleLogout}
          style={{
            width: "6rem",
            height: "2rem",
            textAlign: "center",
            padding: "0.2rem 0",
            position: "relative",
            marginLeft: "55%",
            marginTop: "-1.9%",
            cursor: "pointer",
          }}
          className="navBarText"
        >
          {" "}
          Log Out
        </div>
      </div>
    );
  } else{
    return (
      <div className="navBar">
        <Link className="logo" to="/home">
          <img src="https://i.imgur.com/QwI6oUK.png" />{" "}
        </Link>
        <Link className="navBarText" to="/vendor/manageprofile">
          Profile
        </Link>
        <div
          onClick={handleLogout}
          style={{
            width: "6rem",
            height: "2rem",
            textAlign: "center",
            padding: "0.2rem 0",
            position: "relative",
            marginLeft: "55%",
            marginTop: "-1.9%",
            cursor: "pointer",
          }}
          className="navBarText"
        >
          {" "}
          Log Out
        </div>
      </div>
    );
  }
}

export default Navbar;
