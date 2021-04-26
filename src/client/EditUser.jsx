import React, { useState } from "react";
import { useParams } from "react-router";
import { InputField } from "./inputField";
import { useLoading } from "./useLoading";
import { ErrorView } from "./errorView";

function EditUserForm({ user, onSubmit }) {
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  async function submit(e) {
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

  const { data: user, loading, error, reload } = useLoading(
    async () => await userApi.getUser(id),
    [id]
  );

  async function handleSubmit(e, { name, lastName, email }) {
    e.preventDefault();
    await userApi.updateUser(id, { name, lastName, email });
  }

  if (error) {
    return <ErrorView error={error} reload={reload} />;
  }

  if (loading || !user) {
    return <p>Loading..</p>;
  }

  return <EditUserForm user={user} onSubmit={handleSubmit} />;
}
