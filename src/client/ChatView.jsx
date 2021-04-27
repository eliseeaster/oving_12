import React, { useEffect, useState } from "react";

export function ChatView({ chatPreview, username, messageApi }) {
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
    if (ws.readyState !== 0)
      ws.send(
        JSON.stringify({
          type: "message",
          message: message,
        })
      );
    setMessage("");
    console.log("message: " + message);
  }

  async function submit(e) {
    e.preventDefault();
    await messageApi.createMessage({ username, message });
  }

  const chatOutput = chatLog.length ? chatLog : chatPreview;
  return (
    <div id="chatContainer">
      <header>
        <h1>Chat page</h1>
      </header>
      <main id="chatLog">
        {chatOutput?.map(({ message, id, username }) => (
          <div className="message" keys={id}>
            <strong>{username}</strong>
            {message}
          </div>
        ))}
      </main>
      <div>
        <form onSubmit={handleSubmitMessage}>
          <input
            type="text"
            autoFocus={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
          <button onClick={submit}>Save</button>
        </form>
      </div>
    </div>
  );
}
