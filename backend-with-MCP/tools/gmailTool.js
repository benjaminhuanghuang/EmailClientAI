import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
});

const gmail = google.gmail({ version: "v1", auth });

export async function getRecentEmails() {
  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 5,
  });

  const emails = [];

  for (const msg of res.data.messages) {
    const data = await gmail.users.messages.get({
      userId: "me",
      id: msg.id,
    });

    emails.push({
      id: msg.id,
      text: data.data.snippet,
    });
  }

  return emails;
}
