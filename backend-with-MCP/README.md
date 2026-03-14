# Backend with MCP

Backend provide HTTP API for React and MCP Server for AI Agent

## Architecture

```txt
React UI
   │
   ▼
REST API 
   │
   ▼
Email Agent
   │
   ▼
MCP client
   │
MCP server
   │
MCP Server
   │
   ├ get_recent_emails
   ├ summarize_email
   ├ extract_todos
   └ generate_reply
```

## Benefit of the MCP

Any AI agent can use the tools provided by MCP

## Setup

```sh
npm i express cors zod @modelcontextprotocol/sdk openai googleapis
```
