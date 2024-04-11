import React, { useEffect, useState } from "react";
import "./Ai.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
const API = "";

const WelcomeAi = () => {
  const dept = "computer engineering";
  const [messages, setMessages] = useState("");

  const processMessageToChatGPT = async () => {
    const systemMessage = {
      role: "system",
      content:
        "Provide a brief summary of about 100 words on the industry trends in " +
        dept +
        " specifically for Zimbabwe, with information that would be useful for interns",
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

      setMessages(data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    processMessageToChatGPT();
  }, []);

  return (
    <div className="welcome-ai-container">
      <div>
        <p>{messages}</p>
      </div>
    </div>
  );
};

export default WelcomeAi;
