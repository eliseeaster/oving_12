import React, { useEffect, useState } from "react";
import "./index.jsx";

function UserInfo() {
  const [users, setUsers] = useState([]);

  async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch}`);
    }
    const json = await res.json();
    setUsers(json);
  }

  useEffect(async () => {
    await fetchJson("/api/users");
  }, []);

  return (
    <div>
      {users.map((user) => (
        <>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.age}</p>
        </>
      ))}
    </div>
  );
}

export default UserInfo;
