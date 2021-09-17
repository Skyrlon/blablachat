import styled from "styled-components";
import PropTypes from "prop-types";
import TextBox from "./TextBox";
import { useDispatch } from "react-redux";

const StyledSendMessage = styled.div`
  grid-area: send;
`;

const SendMessage = ({
  currentUser,
  showEmojis,
  switchShowEmojis,
  currentChatRoom,
}) => {
  const dispatch = useDispatch();

  const submitNewMessage = (message) => {
    dispatch({
      type: "ADD_NEW_MESSAGE",
      payload: {
        writer: currentUser.id,
        time: Date.now(),
        text: message,
        chatroomId: currentChatRoom,
      },
    });
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

SendMessage.propTypes = {
  currentUser: PropTypes.object,
  showEmojis: PropTypes.object,
  switchShowEmojis: PropTypes.func,
  currentChatRoom: PropTypes.number,
};

export default SendMessage;
