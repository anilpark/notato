import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders header", () => {
  render(<App />);
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
});
