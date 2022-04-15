import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ConnexionPage from "./ConnexionPage";
import { store } from "../store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const MockConnexionPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnexionPage />
      </BrowserRouter>
    </Provider>
  );
};

it("renders link", async () => {
  render(<MockConnexionPage />);
  const linkElement = screen.getByTestId("link");
  expect(linkElement).toBeInTheDocument();
});

it("renders link with correct text", async () => {
  render(<MockConnexionPage />);
  const linkElement = screen.getByTestId("link");
  expect(linkElement).toHaveTextContent(
    "Don't have an account yet ? Create One !"
  );
});

it("switch link text when clicked on", async () => {
  render(<MockConnexionPage />);
  const linkElement = screen.getByTestId("link");
  fireEvent.click(linkElement);
  expect(linkElement).toHaveTextContent("Already have an account ? Log In !");
});
