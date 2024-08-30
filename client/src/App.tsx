import { useState } from "react";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<any>([]);

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      };

      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      const useMessage = {
        role: "user",
        content: value,
      };
      setChat((oldData: any) => [...oldData, data, useMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const latestCode = chat
    .filter((message: ChatData) => message.role === "assistant")
    .pop();

  return (
    <div className="app">
      <h1 className="title">SQL Query Generator Using OpenAI</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here"
      />
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          Generate Query!
        </button>
        <button id="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>
      <div className="code-display">
        <div className="code-title">Output</div>
        <div className="code-output">
          <p>{latestCode?.content || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
