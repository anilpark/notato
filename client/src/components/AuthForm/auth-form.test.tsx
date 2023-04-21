import React from "react";
import { render, screen } from "@testing-library/react";
import AuthForm from "./index";
import userEvent from "@testing-library/user-event";

test("Login button is disabled until username value has at least 5 characters", () => {
  render(
    <AuthForm
      handleRegister={async (data) => {}}
      handleLogin={async (data) => {}}
    />
  );

  const input = screen.getByLabelText("Username");
  const button = screen.getByRole("button", { name: /login/i });

  // Initial state: button should be disabled
  expect(button).toBeDisabled();

  // Input less than 5 characters
  userEvent.type(input, "1234");
  expect(button).toBeDisabled();
});
