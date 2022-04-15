import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextBox from "./TextBox";

it("renders input", async () => {
  render(<TextBox />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

it("should be able to type in input", async () => {
  render(<TextBox />);
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "A simple message" } });
  expect(input.value).toBe("A simple message");
});

it("renders emoji button", async () => {
  render(<TextBox />);
  const emojiButton = screen.getByTestId("EmojiEmotionsOutlinedIcon");
  expect(emojiButton).toBeInTheDocument();
});

it("shows emoji mart after cliking on emoji button", async () => {
  render(<TextBox />);
  const emojiButton = screen.getByTestId("EmojiEmotionsOutlinedIcon");
  fireEvent.click(emojiButton);
  const emojimartElement = screen.getByLabelText("Emoji Mart™");
  expect(emojimartElement).toBeInTheDocument();
});

it("hides emoji mart after cliking 2 times on emoji button", async () => {
  render(<TextBox />);
  const emojiButton = screen.getByTestId("EmojiEmotionsOutlinedIcon");
  fireEvent.click(emojiButton);
  const emojimartElement = screen.getByLabelText("Emoji Mart™");
  fireEvent.click(emojiButton);
  expect(emojimartElement).not.toBeInTheDocument();
});
