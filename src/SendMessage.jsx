import styled from "styled-components";
import TextBox from "./TextBox";

const StyledSendMessage = styled.div`
  grid-area: send;
`;

const SendMessage = ({
  messages,
  currentUser,
  modifyMessages,
  showEmojis,
  switchShowEmojis,
}) => {
  const submitNewMessage = (message) => {
    let newMessage = {
      id: messages.length,
      writerID: currentUser.id,
      time: Date.now(),
      text: message,
      modified: false,
      deleted: false,
    };
    modifyMessages([...messages, newMessage]);
  };

  return (
    <StyledSendMessage>
      <TextBox
        type="new"
        showEmojis={showEmojis}
        onEmojiButtonClick={switchShowEmojis}
        onEmojiClickAway={switchShowEmojis}
        submitMessage={submitNewMessage}
        text=""
      />
    </StyledSendMessage>
  );
};

SendMessage.defaultProps = {
  messages: [],
};

export default SendMessage;
