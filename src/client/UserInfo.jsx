import React from "react";
import { Link } from "react-router-dom";
import { useLoading } from "./lib/useLoading";
import { ErrorView } from "./components/ErrorView";

export function UserInfo({ userApi }) {
  const { data: users, error, loading, reload } = useLoading(
    async () => await userApi.listUsers()
  );

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !users) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <p>Click on the user to change info</p>
      {users.map(({ id, name, lastName, email }) => (
        <li key={id}>
          <Link
            to={`/users/${id}/edit`}
          >{`Name: ${name}  Last Name: ${lastName} Email: ${email}`}</Link>
        </li>
      ))}
    </>
  );
}
