import React, { useState } from "react";
import "./index.jsx";
import { ChatView } from "./ChatView";

export function ChatPage({ messageApi }) {
  const [username, setUsername] = useState();
  if (!username) {
    return <ChatLogin onLogin={(username) => setUsername(username)} />;
  }
  return <ChatView username={username} messageApi={messageApi} />;
}

function ChatLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
    console.log("username" + username);
  }
  return (
    <div>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default ChatPage;
