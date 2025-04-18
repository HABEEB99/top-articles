import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../../components";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();
  const props = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: mockOnPageChange,
  };

  test("renders pagination buttons", () => {
    render(<Pagination {...props} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("disables Previous button on first page", () => {
    render(<Pagination {...props} currentPage={1} />);
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).not.toBeDisabled();
  });

  test("disables Next button on last page", () => {
    render(<Pagination {...props} currentPage={5} />);
    expect(screen.getByText("Next")).toBeDisabled();
    expect(screen.getByText("Previous")).not.toBeDisabled();
  });

  test("calls onPageChange when page button is clicked", () => {
    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("calls onPageChange when Previous/Next buttons are clicked", () => {
    render(<Pagination {...props} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
