import React, { useEffect, useState } from "react";
import "./Ai.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
const API = "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";

const UploadProjAi = () => {
  const dept = "software engineering";
  const [messages, setMessages] = useState("");

  const processMessageToChatGPT = async () => {
    const systemMessage = {
      role: "system",
      content: `Provide guidelines on what each project video presentation for a ${dept} intern in Zimbabwe should contain, considering that the videos will be part of a portfolio viewed by potential recruiters.`,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();
      const formatAsList = (data) => {
        const projects = data.choices[0].message.content.split(/(?=\d\.)/);

        const listItems = projects
          .map((project) => `<li style="padding: 10px 0;">${project}</li>`)
          .join("");

        return `<ul>${listItems}</ul>`;
      };

      // ...

      setMessages(formatAsList(data));

      setMessages(formatAsList(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    processMessageToChatGPT();
  }, []);

  return (
    <div className="projects-ai">
      <div>
        <p dangerouslySetInnerHTML={{ __html: messages }} />
      </div>
    </div>
  );
};

export default UploadProjAi;
