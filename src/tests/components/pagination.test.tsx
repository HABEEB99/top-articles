import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../components";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();
  const props = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test("renders pagination buttons", () => {
    render(<Pagination {...props} />);
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    render(<Pagination {...props} currentPage={1} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).not.toBeDisabled();
  });

  test("disables Next button on last page", () => {
    render(<Pagination {...props} currentPage={5} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).not.toBeDisabled();
  });

  test("calls onPageChange when page button is clicked", () => {
    render(<Pagination {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange when Previous/Next buttons are clicked", () => {
    render(<Pagination {...props} />);
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);

    mockOnPageChange.mockClear(); // Clear mock for Next button test

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
