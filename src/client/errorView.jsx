import * as React from "react";
import { Link } from "react-router-dom";

export function ErrorView({ error }) {
  if (error.status === 401) {
    return (
      <div>
        You are not logged in{" "}
        <Link to={"/home"}>
          <button>Log in</button>
        </Link>
      </div>
    );
  }
  return (
    <>
      <div>Something went wrong: {error.toString()}</div>
    </>
  );
}
