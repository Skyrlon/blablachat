import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddChatRoom from "./AddChatRoom";
import { Provider } from "react-redux";
import { store } from "../store";

const MockAddChatRoom = () => {
  return (
    <Provider store={store}>
      <AddChatRoom />
    </Provider>
  );
};

it("renders add icon", async () => {
  render(<MockAddChatRoom />);
  const addIcon = screen.getByTestId("AddIcon");
  expect(addIcon).toBeInTheDocument();
});

it("should show SelectFriendsDropDown menu after clicking on add icon", async () => {
  render(<MockAddChatRoom />);
  const addIcon = screen.getByTestId("AddIcon");
  fireEvent.click(addIcon);
  const dropdown = screen.getByTestId("select-friends-dropdown");
  expect(dropdown).toBeInTheDocument();
});
