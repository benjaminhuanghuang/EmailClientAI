import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { z } from "zod";

import { getRecentEmails } from "../tools/gmailTool.js";
import {
  summarizeEmail,
  extractTodos,
  generateReply,
} from "../tools/aiTool.js";

const server = new Server(
  {
    name: "email-tools",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.tool("get_recent_emails", {}, async () => {
  const emails = await getRecentEmails();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(emails),
      },
    ],
  };
});

server.tool(
  "summarize_email",
  {
    email: z.string(),
  },
  async ({ email }) => {
    const summary = await summarizeEmail(email);

    return {
      content: [
        {
          type: "text",
          text: summary,
        },
      ],
    };
  },
);

server.tool(
  "extract_todos",
  {
    email: z.string(),
  },
  async ({ email }) => {
    const todos = await extractTodos(email);

    return {
      content: [
        {
          type: "text",
          text: todos,
        },
      ],
    };
  },
);

server.tool(
  "generate_reply",
  {
    email: z.string(),
  },
  async ({ email }) => {
    const reply = await generateReply(email);

    return {
      content: [
        {
          type: "text",
          text: reply,
        },
      ],
    };
  },
);

export async function startMcpServer() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.log("MCP Email Server running");
}
