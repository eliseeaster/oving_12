const express = require("express");
const userApi = express.Router();

const users = [
  {
    id: 1,
    name: "Elise",
    lastName: "Andersen",
    email: "23",
  },
  {
    id: 2,
    name: "Tina",
    lastName: "Kristensen",
    age: "22",
  },
  {
    id: 3,
    name: "Fanny",
    lastName: "Haraldsen",
    age: "22",
  },
];

userApi.get("", (req, res) => {
  res.json(users);
});

userApi.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((b) => b.id === id);
  res.json(user);
});

userApi.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((b) => b.id === id);
  const { name, lastName, email } = req.body;
  users[userIndex] = { name, lastName, email, id };
  res.status(200).end();
});

userApi.post("", (req, res) => {
  const { name, lastName, email } = req.body;
  console.log(req.body);
  users.push({ name, lastName, email, id: users.length + 1 });
  res.status(201).end();
});

module.exports = userApi;
