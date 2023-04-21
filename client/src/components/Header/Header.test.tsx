import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "./index";

test("Renders logo", () => {
  render(<Header />);
  const logoImage = screen.getByRole("img");
  const logoText = screen.getByText("notato");
  expect(logoImage).toBeInTheDocument();
  expect(logoText).toBeInTheDocument();
});
