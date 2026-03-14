/*
call tools via MCP Client
*/
import { Client } from "@modelcontextprotocol/sdk/client/stdio.js";

const client = new Client();
await client.connect();

export async function runEmailAgent(userQuery) {
  const taskCompleted = false;
  const state = {
    emails: [],
    summaries: [],
    todos: [],
    replies: [],
  };

  const emailsResp = await client.callTool("get_recent_emails");
  state.emails = JSON.parse(emailsResp.content[0].text);

  for (const email of state.emails) {
    let stepCompleted = false;
    const emailState = { summary: null, todos: null, reply: null };

    while (!stepCompleted) {
      const decisionPrompt = `
        Current email: ${email.text}
        Current state: ${JSON.stringify(emailState)}
        Task: ${userQuery}
        Question: Which tool should I call next? Options: summarize_email, extract_todos, generate_reply, done
        Answer with JSON: { "tool": "tool_name" }
      `;

      const decisionResp = await client.callTool("generate_reply", {
        email: decisionPrompt,
      });
      const decision = JSON.parse(decisionResp.content[0].text);

      if (decision.tool === "summarize_email") {
        const summaryResp = await client.callTool("summarize_email", {
          email: email.text,
        });
        emailState.summary = summaryResp.content[0].text;
      } else if (decision.tool === "extract_todos") {
        const todosResp = await client.callTool("extract_todos", {
          email: email.text,
        });
        emailState.todos = todosResp.content[0].text;
      } else if (decision.tool === "generate_reply") {
        const replyResp = await client.callTool("generate_reply", {
          email: email.text,
        });
        emailState.reply = replyResp.content[0].text;
      } else if (decision.tool === "done") {
        stepCompleted = true;
      }
    }

    state.summaries.push(emailState.summary);
    state.todos.push(emailState.todos);
    state.replies.push(emailState.reply);
  }

  return state;
}
