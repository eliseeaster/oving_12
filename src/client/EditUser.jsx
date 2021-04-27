import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { InputField } from "./inputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./errorView";
import { LoadingView } from "./loadingView";

function EditUserForm({ user, onSubmit }) {
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  async function submit(e) {
    e.preventDefault();
    onSubmit(e, { name, lastName, email });
  }

  return (
    <form onSubmit={submit}>
      <h1>Edit an existing user ({name})</h1>
      <InputField label={"Name"} value={name} onChangeValue={setName} />
      <InputField
        label={"Last name"}
        value={lastName}
        onChangeValue={setLastName}
      />
      <InputField label={"Email"} value={email} onChangeValue={setEmail} />
      <button>Submit</button>
    </form>
  );
}

export function EditUser({ userApi }) {
  const { id } = useParams();
  const history = useHistory;

  const { data: user, loading, error, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  async function handleSubmit(e, { name, lastName, email }) {
    e.preventDefault();
    await userApi.updateUser(id, { name, lastName, email });
    history.push("/");
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !user) {
    return <LoadingView />;
  }

  return <EditUserForm user={user} onSubmit={handleSubmit} />;
}
