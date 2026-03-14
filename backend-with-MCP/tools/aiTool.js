import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeEmail(email) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize this email." },
      { role: "user", content: email },
    ],
  });

  return res.choices[0].message.content;
}

export async function extractTodos(email) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Extract actionable tasks." },
      { role: "user", content: email },
    ],
  });

  return res.choices[0].message.content;
}

export async function generateReply(email) {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Write a professional reply." },
      { role: "user", content: email },
    ],
  });

  return res.choices[0].message.content;
}
