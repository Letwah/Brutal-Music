import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/components/App";

describe("App healthcheck ", () => {
  it("App renders sucessfully when no token present", () => {
    render(<App />);
    expect(screen.getByText(/Brutalist Music/)).toBeInTheDocument();
  });
  it("App renders sucessfully when token is present", async () => {
    //some magic with parent component
    const mockParentComponent = { token: "token" };
    const MockParentComponentContext = {
      Provider: ({ children }: { children: any }) => children,
      Consumer: ({ children }: { children: any }) =>
        children(mockParentComponent),
    };

    await render(
      <MockParentComponentContext.Provider>
        {() => <App />}
      </MockParentComponentContext.Provider>
    );
    expect(screen.queryByText(/Brutalist Music/)).not.toBeInTheDocument();
  });
});
