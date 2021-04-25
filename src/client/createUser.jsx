import React, { useState } from "react";
import { InputField } from "./InputField";

export function CreateUser({ userApi }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  async function submit(e) {
    e.preventDefault();
    await userApi.createUser({ name, email, age });
  }

  return (
    <form onSubmit={submit}>
      <h1>Create new user</h1>
      <InputField label={"Name"} value={name} onChangeValue={setName} />
      <InputField label={"Email"} value={email} onChangeValue={setEmail} />
      <InputField
        label={"Age"}
        value={age}
        onChangeValue={setAge}
        type="number"
      />
      <button>Submit</button>
    </form>
  );
}
