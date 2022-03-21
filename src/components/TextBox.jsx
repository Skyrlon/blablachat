import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendIcon from "@mui/icons-material/Send";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ClickAwayListener from "react-click-away-listener";

const StyledTextBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .tips {
    & span {
      color: #18181a;
    }
  }
`;

const StyledTextBox = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 2em;
  width: 100%;
  border-radius: 0.5em;
  align-items: center;

  & .emoji-mart-container {
    position: absolute;
    ${(props) => (props.position > 0.5 ? "bottom:100%" : "top:100%")};
    right: 0px;
  }

  & .emoji-mart-preview {
    display: none;
  }
`;

const TextBox = ({ type, submitMessage, text, cancelEdit }) => {
  const [showEmojiMenu, setShowEmojiMenu] = useState();

  const [message, setMessage] = useState(text);

  const [messagePosition, setMessagePosition] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setShowEmojiMenu(false);
      onSubmit(e);
    }
    if (e.key === "Escape") {
      setShowEmojiMenu(false);
      cancelEdit();
    }
  };

  const handleClickEmojiButton = (e) => {
    setShowEmojiMenu((v) => !v);
    setMessagePosition(e.pageY / window.innerHeight);
  };

  const addEmoji = (emoji) => {
    setMessage(`${message} ${emoji.native}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Prevent submiting message with only spaces, line breaks, and tabs
    if (!message.replace(/\s/g, "")) return;
    submitMessage(message);
    setShowEmojiMenu(false);
    setMessage("");
  };

  return (
    <StyledTextBoxContainer>
      <StyledTextBox onSubmit={onSubmit} position={messagePosition}>
        <TextField
          sx={{
            width: "95%",
            margin: "1rem 1rem",
          }}
          multiline
          maxRows={3}
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Write a message..."
          InputProps={{
            style: {
              padding: "0.25rem 1rem",
            },
            endAdornment: (
              <div className="emoji-container">
                <IconButton onClick={handleClickEmojiButton}>
                  <EmojiEmotionsOutlinedIcon className="emoji-button" />
                </IconButton>
                {showEmojiMenu && (
                  <ClickAwayListener
                    onClickAway={() => setShowEmojiMenu(false)}
                  >
                    <div className="emoji-mart-container">
                      <Picker onSelect={addEmoji} emojiTooltip={true} />
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            ),
          }}
        />

        {type === "new" && (
          <IconButton sx={{ margin: "0rem 1rem" }} onClick={onSubmit}>
            <SendIcon />
          </IconButton>
        )}
      </StyledTextBox>

      {type === "edit" && (
        <div className="tips">
          Press Esc to <span onClick={cancelEdit}>cancel</span> - Press Enter to{" "}
          <span onClick={onSubmit}>save</span>
        </div>
      )}
    </StyledTextBoxContainer>
  );
};

export default TextBox;

TextBox.propTypes = {
  type: PropTypes.string,
  submitMessage: PropTypes.func,
  text: PropTypes.string,
  cancelEdit: PropTypes.func,
};
