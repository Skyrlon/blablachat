import styled from "styled-components";
import PropTypes from "prop-types";
import TextBox from "./TextBox";
import { useDispatch } from "react-redux";

const StyledSendMessage = styled.div``;

const SendMessage = ({ currentChatroomId }) => {
  const dispatch = useDispatch();

  const submitNewMessage = (message) => {
    dispatch({
      type: "ADD_NEW_MESSAGE",
      payload: {
        time: Date.now(),
        text: message,
        chatroomId: currentChatroomId,
      },
    });
  };

  return (
    <StyledSendMessage>
      <TextBox type="new" submitMessage={submitNewMessage} text="" />
    </StyledSendMessage>
  );
};

SendMessage.defaultProps = {
  messages: [],
};

SendMessage.propTypes = {
  currentChatroomId: PropTypes.number,
};

export default SendMessage;
