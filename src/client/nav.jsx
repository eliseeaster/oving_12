import React from "react";
import "./index.jsx";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Welcome</li>
        </Link>
        <Link to={"/users"}>
          <li>User info</li>
        </Link>
        <Link to={"/login"}>
          <li>Login</li>
        </Link>
        <Link to={"/chat"}>
          <li>Chat</li>
        </Link>
        <Link to={"/createUser"}>
          <li>Create user</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
