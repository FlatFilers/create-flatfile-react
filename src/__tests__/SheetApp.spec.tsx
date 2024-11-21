import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SheetApp } from "../SheetApp";
import { FlatfileProvider, useFlatfile } from "@flatfile/react";
import "@testing-library/jest-dom";

// Mock the @flatfile/react module
jest.mock("@flatfile/react", () => ({
  ...jest.requireActual("@flatfile/react"),
  useFlatfile: jest.fn(),
  FlatfileProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Sheet: () => <div data-testid="mock-sheet">Sheet Component</div>
}));

describe("SheetApp", () => {
  const mockOpenPortal = jest.fn();
  const mockClosePortal = jest.fn();
  
  beforeEach(() => {
    // Setup default mock implementation
    (useFlatfile as jest.Mock).mockReturnValue({
      open: false,
      openPortal: mockOpenPortal,
      closePortal: mockClosePortal
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with Open Portal button initially", () => {
    render(<SheetApp publishableKey="test-key" />);
    const button = screen.getByRole("button", { name: /Open Portal/i });
    expect(button).toBeInTheDocument();
  });

  it("opens portal when button is clicked and portal is closed", () => {
    render(<SheetApp publishableKey="test-key" />);
    
    const button = screen.getByRole("button", { name: /Open Portal/i });
    fireEvent.click(button);
    
    expect(mockOpenPortal).toHaveBeenCalled();
  });

  it("closes portal when button is clicked and portal is open", () => {
    // Mock portal as open
    (useFlatfile as jest.Mock).mockReturnValue({
      open: true,
      openPortal: mockOpenPortal,
      closePortal: mockClosePortal
    });

    render(<SheetApp publishableKey="test-key" />);
    
    const button = screen.getByRole("button", { name: /Close Portal/i });
    fireEvent.click(button);
    
    expect(mockClosePortal).toHaveBeenCalled();
  });
});
