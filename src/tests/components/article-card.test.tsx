import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Result } from "../../interfaces/articles-interface";
import { ArticleCard } from "../../components";

const mockArticle: Result = {
  id: 123,
  uri: "uri-123",
  url: "https://nytimes.com/article",
  asset_id: 123,
  source: "NYT",
  published_date: "2023-01-01",
  updated: "2023-01-02",
  section: "News",
  subsection: "",
  nytdsection: "news",
  adx_keywords: "",
  column: null,
  byline: "By Author",
  type: "article",
  title: "Test Article",
  abstract: "Test Abstract",
  des_facet: [],
  org_facet: [],
  per_facet: [],
  geo_facet: [],
  media: [
    {
      type: "image",
      subtype: "",
      caption: "Test Image",
      copyright: "",
      approved_for_syndication: 0,
      "media-metadata": [
        { url: "", format: "", height: 0, width: 0 },
        { url: "", format: "", height: 0, width: 0 },
        {
          url: "https://example.com/image.jpg",
          format: "Large",
          height: 200,
          width: 300,
        },
      ],
    },
  ],
  eta_id: 0,
};

describe("ArticleCard", () => {
  test("renders article title, abstract, and image", () => {
    render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Test Abstract")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
    expect(screen.getByRole("link", { name: /view details/i })).toHaveAttribute(
      "href",
      "/article/123"
    );
  });

  test("renders without image if media is missing", () => {
    const articleNoMedia = { ...mockArticle, media: [] };
    render(
      <MemoryRouter>
        <ArticleCard article={articleNoMedia} />
      </MemoryRouter>
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("Test Article")).toBeInTheDocument();
  });

  test("applies Tailwind classes and motion props", () => {
    const { container } = render(
      <MemoryRouter>
        <ArticleCard article={mockArticle} />
      </MemoryRouter>
    );
    expect(container.firstChild).toHaveClass(
      "bg-white rounded-xl overflow-hidden shadow-lg"
    );
  });
});
