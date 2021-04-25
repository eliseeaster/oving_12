import React, { useEffect, useState } from "react";
import "./index.jsx";

export function ChatPage() {
  const [username, setUsername] = useState();
  if (!username) {
    return <ChatLogin onLogin={(username) => setUsername(username)} />;
  }
  return <ChatView username={username} />;
}

function ChatLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(username);
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

export function ChatView({ username }) {
  const [chatLog, setChatlog] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => {
      const { message, id, username } = JSON.parse(event.data);
      setChatlog((chatLog) => [...chatLog, { message, id, username }]);
    };
    ws.onopen = (event) => {
      ws.send(
        JSON.stringify({
          type: "login",
          username,
        })
      );
    };
    setWs(ws);
  }, []);

  function handleSubmitMessage(e) {
    e.preventDefault();
    ws.send(
      JSON.stringify({
        type: "message",
        message: message,
      })
    );
    setMessage("");
  }

  return (
    <>
      <h1>Chat page</h1>
      <div>
        {chatLog.map(({ message, id, username }) => (
          <div keys={id}>
            <strong>{username}</strong>
            {message}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}
export default ChatPage;
