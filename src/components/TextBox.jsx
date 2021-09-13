import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextareaAutosize } from "@material-ui/core";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ClickAwayListener from "react-click-away-listener";

const StyledTextBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .tips {
    & span {
      color: blue;
    }
  }
`;

const StyledTextBox = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 2em;
  width: 100%;
  border: 2px solid;
  border-radius: 0.5em;
  align-items: center;

  & .emoji-button {
    position: absolute;
    right: 1%;
  }

  & .emoji-mart {
    position: absolute;
    top: -25em;
    left: 80%;
  }

  & .emoji-mart-preview {
    display: none;
  }
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  border: none;
  overflow: hidden;
  margin-left: 1%;
  width: 90%;
  &:focus {
    outline: none;
  }
`;

const TextBox = ({
  type,
  showEmojis,
  onEmojiButtonClick,
  onEmojiClickAway,
  submitMessage,
  text,
  cancelEdit,
}) => {
  const [message, setMessage] = useState(text);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const addEmoji = (emoji) => {
    setMessage(`${message} ${emoji.native}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Prevent submiting message with only spaces, line breaks, and tabs
    if (!message.replace(/\s/g, "")) return;
    submitMessage(message);
    setMessage("");
  };

  return (
    <StyledTextBoxContainer>
      <StyledTextBox onSubmit={onSubmit}>
        <StyledTextArea
          rowsMin={1}
          rowsMax={3}
          value={message}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e)}
        />

        <div
          className="emoji-button"
          onClick={() => {
            onEmojiButtonClick({
              show:
                showEmojis.input !== type ||
                (showEmojis.input === type && !showEmojis.show),
              input: type,
            });
          }}
        >
          Emoji
        </div>

        {showEmojis.show && showEmojis.input === type && (
          <ClickAwayListener
            onClickAway={(e) => {
              if (e.target.className !== "emoji-button")
                onEmojiClickAway({ show: false, input: "" });
            }}
          >
            <div>
              <Picker onSelect={addEmoji} emojiTooltip={true} />
            </div>
          </ClickAwayListener>
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
  showEmojis: PropTypes.object,
  onEmojiButtonClick: PropTypes.func,
  onEmojiClickAway: PropTypes.func,
  submitMessage: PropTypes.func,
  text: PropTypes.string,
  cancelEdit: PropTypes.func,
};
