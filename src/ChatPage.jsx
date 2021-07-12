import Chat from "./Chat.jsx";

const ChatPage = ({ msg, modifyMessages }) => {
  return <Chat messages={msg} modifyMessages={modifyMessages} />;
};

export default ChatPage;
