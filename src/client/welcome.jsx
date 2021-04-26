import React from "react";
import "./index.jsx";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to="/users">Profile page</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/chat">Chat</Link>
        </li>

        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </div>
  );
}

export default Welcome;
