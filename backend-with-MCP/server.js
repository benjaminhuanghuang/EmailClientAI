/*
  Run API server and MCP server together
*/
import express from "express";
import cors from "cors";

import { startMcpServer } from "./mcp/emailMcpServer.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3001, () => {
  console.log("API running on 3001");
});

// Start MCP server
startMcpServer();
