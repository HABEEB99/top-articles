import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArticlePage from "../../pages/article-page";
import { usePopularArticles } from "../../hooks/use-popular-articles";
import * as routerDom from "react-router-dom";

jest.mock("../../hooks/use-popular-articles");

const queryClient = new QueryClient();

const mockArticles = {
  status: "ok",
  results: [
    {
      id: 1,
      title: "Article 1",
      abstract: "Abstract 1",
      byline: "Author 1",
      published_date: "2023-01-01",
      url: "https://nytimes.com/1",
      media: [{ "media-metadata": [{}, {}, { url: "image1.jpg" }] }],
    },
  ],
};

describe("ArticlePage", () => {
  beforeEach(() => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: mockArticles,
      isLoading: false,
      error: null,
    });
  });

  const renderArticlePage = (id: string = "1") =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/article/${id}`]}>
          <ArticlePage />
        </MemoryRouter>
      </QueryClientProvider>
    );

  test("renders loading state", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    renderArticlePage();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    (usePopularArticles as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("API Error"),
    });
    renderArticlePage();
    expect(screen.getByText("Error loading article")).toBeInTheDocument();
  });

  test("renders article not found", () => {
    renderArticlePage("999");
    expect(screen.getByText("Article not found")).toBeInTheDocument();
  });

  test("renders article details", () => {
    renderArticlePage();
    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Abstract 1")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image1.jpg");
    expect(
      screen.getByRole("link", { name: /read full article/i })
    ).toHaveAttribute("href", "https://nytimes.com/1");
  });

  test("navigates back home on button click", () => {
    const navigate = jest.fn();
    jest.spyOn(routerDom, "useNavigate").mockReturnValue(navigate);
    renderArticlePage();
    fireEvent.click(screen.getByText("Go back home"));
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
