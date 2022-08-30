import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import React from "react";

describe("validate Button", () => {
  test("renders Button", () => {
    render(<Button onClick={() => console.log("button log")}>Button</Button>);
    const linkElem = screen.getByText(/button/i);
    const btn = screen.getByRole("button");
    expect(linkElem).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  test("call onCLick button", () => {
    const consoleLogSpy = jest.fn();
    const { getByRole } = render(
      <Button onClick={consoleLogSpy}>Button</Button>
    );
    fireEvent.click(getByRole("button"));
    expect(consoleLogSpy).toHaveBeenCalled();
  });
});
