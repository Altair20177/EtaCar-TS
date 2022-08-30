import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import React from "react";

describe("validate Modal", () => {
  test("renders Modal", () => {
    render(
      <Modal setIsPopupOpen={() => console.log(3)} isPopupOpen={true}>
        Modal
      </Modal>
    );
    const linkElem = screen.getByText(/modal/i);
    expect(linkElem).toBeInTheDocument();
  });
});
