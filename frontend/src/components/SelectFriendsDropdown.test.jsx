import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import SelectFriendsDropdown from "./SelectFriendsDropdown";
import { store } from "../store";

const MockSelectFriendsDropdown = () => {
  return (
    <Provider store={store}>
      <SelectFriendsDropdown />
    </Provider>
  );
};

it("renders 'create chatroom' button", async () => {
  render(<MockSelectFriendsDropdown />);
  const dropdownButon = screen.getByRole("button");
  expect(dropdownButon).toBeInTheDocument();
});

it("should disable 'create chatroom' button if there is no friends", async () => {
  render(<MockSelectFriendsDropdown />);
  const dropdownButon = screen.getByRole("button");
  expect(dropdownButon).toBeDisabled();
});

it("renders a text when there are no friends", async () => {
  render(<MockSelectFriendsDropdown />);
  const noFriendsText = screen.getByText("No Friends to Add");
  expect(noFriendsText).toBeInTheDocument();
});
