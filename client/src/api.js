const API_BASE = "http://localhost:3001";

export const fetchEmails = async () => {
  const res = await fetch(`${API_BASE}/agent-emails`);
  return res.json();
};

// For summary, todos, and reply generation
export const runAgentOnEmail = async (emailText) => {
  const res = await fetch(`${API_BASE}/agent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: emailText }),
  });
  return res.json();
};
