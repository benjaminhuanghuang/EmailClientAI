import OpenAI from "openai"

import { getRecentEmails } from "./tools/gmailTool.js"
import {
  summarizeEmail,
  extractTodos,
  generateReply
} from "./tools/aiTools.js"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function runEmailAgent(userRequest) {

  // Step 1: get inbox
  const emails = await getRecentEmails()

  const report = []

  for (const email of emails) {

    const summary = await summarizeEmail(email.text)

    const todos = await extractTodos(email.text)

    const reply = await generateReply(email.text)

    report.push({
      email: email.text,
      summary,
      todos,
      reply
    })
  }

  return report
}