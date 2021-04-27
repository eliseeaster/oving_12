import React from "react";
import { useLoading } from "./lib/useLoading";
import { LoadingView } from "./components/LoadingView";
import { ErrorView } from "./components/ErrorView";

export function LoginInfoPage({ userApi }) {
  const { loading, error, data, reload } = useLoading(
    async () => await userApi.loadProfile()
  );

  if (loading || !data) {
    return <LoadingView />;
  }
  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  return (
    <div>
      <h1>Your profile</h1>
      <div>Name: {data.name}</div>
      <div>Email: {data.email}</div>
    </div>
  );
}
