import React, { useEffect, useRef, useState } from 'react';

const ChatBox = ({ messages }) => {
  const [hasMessages, setHasMessages] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setHasMessages(messages.length > 0); 
  }, [messages]);

  return (
    <div>
      {!hasMessages && ( 
        <div className='Header'>
        <h1>You received something unusual today?<br/><span className="white-text">Let's check spam or not... </span></h1>
         
          
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
