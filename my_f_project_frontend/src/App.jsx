import { useState, useEffect } from "react";

import Card from "./components/cards";
import Form from "./components/forms";

function App() {
  const [fileItemQuote, setFileItemQuote] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/files');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setFileItemQuote(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-5">
      <h4 className="text-center mb-4">My File Gallery</h4>
      <hr />
      <div className="mb-5">
        <Form onSuccess={fetchFiles} />
      </div>
    
      <hr />
      <Card card_contents={fileItemQuote} />
    </div>
  );
}

export default App;