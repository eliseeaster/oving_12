import React from "react";
import { useLoading } from "./useLoading";
import { LoadingView } from "./loadingView";
import { ErrorView } from "./errorView";

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
      <h1>Profile</h1>
      <div>Name: {data.name}</div>
      <div>Message: {data.email}</div>
    </div>
  );
}
