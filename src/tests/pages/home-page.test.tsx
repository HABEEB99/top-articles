import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "../../pages/home-page";
import { usePopularArticles } from "../../hooks/use-popular-articles";

jest.mock("../../hooks/use-popular-articles");

const queryClient = new QueryClient();

const mockArticles = {
  status: "ok",
  num_results: 20,
  results: [
    {
      id: 1,
      title: "Article 1",
      abstract: "Abstract 1",
      section: "News",
      byline: "Author 1",
      published_date: "2023-01-01",
      url: "https://nytimes.com/1",
      media: [{ "media-metadata": [{}, {}, { url: "image1.jpg" }] }],
    },
    {
      id: 2,
      title: "Article 2",
      abstract: "Abstract 2",
      section: "Sports",
      byline: "Author 2",
      published_date: "2023-01-02",
      url: "https://nytimes.com/2",
      media: [],
    },
  ],
};

describe("HomePage", () => {
  beforeEach(() => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: mockArticles,
      isLoading: false,
      error: null,
    });
  });

  const renderHomePage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );

  test("renders loading state", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    renderHomePage();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("API Error"),
    });
    renderHomePage();
    expect(screen.getByText("Error fetching articles")).toBeInTheDocument();
  });

  test("renders no articles message", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: { status: "ok", results: [] },
      isLoading: false,
      error: null,
    });
    renderHomePage();
    expect(screen.getByText("No Articles")).toBeInTheDocument();
  });

  test("renders article cards", async () => {
    renderHomePage();
    await waitFor(() => {
      expect(screen.getByText("Article 1")).toBeInTheDocument();
      expect(screen.getByText("Article 2")).toBeInTheDocument();
    });
  });

  test("filters articles by search term", async () => {
    renderHomePage();
    fireEvent.change(screen.getByPlaceholderText("Search articles..."), {
      target: { value: "Article 1" },
    });
    await waitFor(() => {
      expect(screen.getByText("Article 1")).toBeInTheDocument();
      expect(screen.queryByText("Article 2")).not.toBeInTheDocument();
    });
  });

  test("filters articles by section", async () => {
    renderHomePage();
    fireEvent.change(screen.getByRole("combobox", { name: /all sections/i }), {
      target: { value: "News" },
    });
    await waitFor(() => {
      expect(screen.getByText("Article 1")).toBeInTheDocument();
      expect(screen.queryByText("Article 2")).not.toBeInTheDocument();
    });
  });

  test("sorts articles by date", async () => {
    renderHomePage();
    fireEvent.change(screen.getByRole("combobox", { name: /newest first/i }), {
      target: { value: "asc" },
    });
    await waitFor(() => {
      const titles = screen
        .getAllByTestId("article-title")
        .map((el) => el.textContent);
      expect(titles).toEqual(["Article 1", "Article 2"]);
    });
  });
});
