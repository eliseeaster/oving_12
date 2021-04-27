import React, { useState } from "react";
import { InputField } from "./inputField";
import { useHistory } from "react-router";

export function CreateUser({ userApi }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    await userApi.createUser({ name, lastName, email });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create new user</h1>
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
