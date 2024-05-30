import React, { useEffect, useRef, useState } from 'react';

const ChatBox = ({ messages }) => {
  const [hasMessages, setHasMessages] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setHasMessages(messages.length > 0); // Check if messages exist
  }, [messages]);

  return (
    <div>
      {!hasMessages && ( // Conditionally render the header based on the presence of messages
        <div className='Header'>
        <h1>Anything On your Mind Today?<br/><span className="white-text">Let's Have A Look!</span></h1>
         
          
        </div>
      )}
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;
