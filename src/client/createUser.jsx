import React, { useState } from "react";
import { InputField } from "./inputField";

export function CreateUser({ userApi }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
