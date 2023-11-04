import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../src/components/Login";

describe("Login healthcheck ", () => {
  it("Login renders sucessfully", () => {
    render(<Login />);
    expect(screen.getByText(/Brutalist Music/)).toBeInTheDocument();
  });
});
