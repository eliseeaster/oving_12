const express = require("express");
const path = require("path");
const userApi = require("./userApi");
const bodyParser = require("body-parser");
const wsServer = require("./websocket");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use("/api/users", userApi);

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const discoveryURL =
  "https://accounts.google.com/.well-known/openid-configuration";

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

app.use(async (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    const { userinfo_endpoint } = await fetchJson(discoveryURL);
    req.userinfo = await fetchJson(userinfo_endpoint, {
      headers: {
        Authorization,
      },
    });
  }
  next();
});

app.get("/api/login-info", async (req, res) => {
  if (!req.userinfo) {
    return res.send(401);
  }
  return res.json(req.userinfo);
});

const server = app.listen(3000, () => {
  console.log("started on port http://localhost:3000");
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      // This will pass control to `wsServer.on("connection")`
      wsServer.emit("connection", socket, req);
    });
  });
});
