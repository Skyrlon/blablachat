import { useState } from "react";
import PropTypes from "prop-types";

import { TextareaAutosize } from "@material-ui/core";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ClickAwayListener from "react-click-away-listener";

const TextBox = ({
  type,
  showEmojis,
  onEmojiButtonClick,
  onEmojiClickAway,
  submitMessage,
  text,
}) => {
  const [message, setMessage] = useState(text);

  const handleChange = (e) => {
    let value;
    const hyperlinkRegex =
      /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))?/gi;
    if (hyperlinkRegex.test(e.target.value)) {
      value = e.target.value.replace(hyperlinkRegex, function (match) {
        return `<a href="${match}">${match}</a>`;
      });
    } else {
      value = e.target.value;
    }
    setMessage(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage(type, message);
      setMessage("");
    }
  };

  const addEmoji = (emoji) => {
    setMessage(`${message} ${emoji.native}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitMessage(type, message.split("\n").join("<br>"));
    setMessage("");
  };

  return (
    <form
      className="writing-form"
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <div className="writing-field">
        <TextareaAutosize
          className="writing-input"
          rowsMin={1}
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
      </div>
      <input type="submit" value="Send" />
    </form>
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
};
