
import ChatBox from "./ChatBox";
import MessageInput from "./MessageInput";
const TextClassifier = ({ messages, onSendMessage }) => {

  
    return (
      <div>
        <ChatBox messages={messages} />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    );
  };
export default TextClassifier;  