import styled from "styled-components";
import PropTypes from "prop-types";
import TextBox from "./TextBox";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../store/Selectors";

const StyledSendMessage = styled.div`
  grid-area: send;
`;

const SendMessage = ({ showEmojis, switchShowEmojis, currentChatroomId }) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector(getCurrentUserId());

  const submitNewMessage = (message) => {
    dispatch({
      type: "ADD_NEW_MESSAGE",
      payload: {
        writer: currentUserId,
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
  showEmojis: PropTypes.object,
  switchShowEmojis: PropTypes.func,
  currentChatroomId: PropTypes.number,
};

export default SendMessage;
