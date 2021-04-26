import React from "react";
import { Link } from "react-router-dom";
import { useLoading } from "./useLoading";
import { ErrorView } from "./errorView";

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
      {users.map(({ id, name, lastName, email }) => (
        <li key={id}>
          <Link
            to={`/users/${id}/edit`}
          >{`Name: ${name} LastName: ${lastName} Email: ${email}`}</Link>
        </li>
      ))}
    </>
  );
}
