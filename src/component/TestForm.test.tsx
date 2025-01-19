import { render, screen } from "@testing-library/react";
import TestForm from "./TestForm";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
describe("checkbox", () => {
  it("test checkbox", async () => {
    render(<TestForm />);
    const remember = screen.getByRole("checkbox", {
      name: /remember me/i,
    });
    await user.click(remember);
    expect(remember).not.toBeChecked();
  });
});
describe("submit test", () => {
  it("check if validation in username", async () => {
    render(<TestForm />);

    const button = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();
    await user.click(button);

    // Log the DOM state after clicking the button
    screen.debug();
    const userValidation = await screen.findByText(
      /please input your username!/i
    );
    expect(userValidation).toBeInTheDocument();
  });
});
