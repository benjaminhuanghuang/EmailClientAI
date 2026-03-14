import React, { useEffect, useState } from "react";
import { fetchEmails } from "./api";
import EmailList from "./components/EmailList";
import EmailViewer from "./components/EmailViewer";

export default function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    const loadEmails = async () => {
      const data = await fetchEmails();
      setEmails(data);
    };
    loadEmails();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <EmailList emails={emails} onSelect={setSelectedEmail} />
      <EmailViewer email={selectedEmail} />
    </div>
  );
}
