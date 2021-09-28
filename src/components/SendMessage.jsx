import styled from "styled-components";
import PropTypes from "prop-types";
import TextBox from "./TextBox";
import { useDispatch } from "react-redux";

const StyledSendMessage = styled.div`
  grid-area: send;
`;

const SendMessage = ({
  userLoggedId,
  showEmojis,
  switchShowEmojis,
  currentChatroomId,
}) => {
  const dispatch = useDispatch();

  const submitNewMessage = (message) => {
    dispatch({
      type: "ADD_NEW_MESSAGE",
      payload: {
        writer: userLoggedId,
        time: Date.now(),
        text: message,
        chatroomId: currentChatroomId,
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
  userLoggedId: PropTypes.number,
  showEmojis: PropTypes.object,
  switchShowEmojis: PropTypes.func,
  currentChatroomId: PropTypes.number,
};

export default SendMessage;
