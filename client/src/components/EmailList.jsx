import React from "react";

export default function EmailList({ emails, onSelect }) {
  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <h2>Inbox</h2>
      {emails.map((email) => (
        <div
          key={email.id}
          style={{
            padding: 10,
            borderBottom: "1px solid #eee",
            cursor: "pointer",
          }}
          onClick={() => onSelect(email)}
        >
          {email.snippet.slice(0, 50)}...
        </div>
      ))}
    </div>
  );
}
