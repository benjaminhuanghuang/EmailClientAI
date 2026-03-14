import React, { useState } from "react";
import { runAgentOnEmail } from "../api";

export default function EmailViewer({ email }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!email) return <div style={{ padding: 20 }}>Select an email to view</div>;

  const handleAgent = async () => {
    setLoading(true);
    const res = await runAgentOnEmail(email.text);
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, width: "70%" }}>
      <h3>Email Content</h3>
      <p>{email.text}</p>

      <button onClick={handleAgent} disabled={loading}>
        {loading ? "Running Agent..." : "Run AI Agent"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>AI Agent Result</h3>
          <div>
            <strong>Summary:</strong>
            <pre>{result.summary}</pre>
          </div>
          <div>
            <strong>Todos:</strong>
            <pre>{result.todos}</pre>
          </div>
          <div>
            <strong>Reply Draft:</strong>
            <pre>{result.reply}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
