describe("Article Flow", () => {
  const mockArticles = {
    status: "ok",
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

  beforeEach(() => {
    cy.mockApi(mockArticles);
    cy.visit("/");
  });

  it("displays article list", () => {
    cy.get('[data-testid="article-card"]').should("have.length", 2);
    cy.get('[data-testid="article-title"]')
      .first()
      .should("have.text", "Article 1");
  });

  it("filters articles by search term", () => {
    cy.get('[data-testid="search-input"]').type("Article 1");
    cy.get('[data-testid="article-card"]').should("have.length", 1);
    cy.get('[data-testid="article-title"]').should("have.text", "Article 1");
  });

  it("filters articles by section", () => {
    cy.get('[data-testid="section-filter"]').select("News");
    cy.get('[data-testid="article-card"]').should("have.length", 1);
    cy.get('[data-testid="article-title"]').should("have.text", "Article 1");
  });

  it("navigates to article details", () => {
    cy.get('[data-testid="article-card"]').first().click();
    cy.url().should("include", "/article/1");
    cy.get('[data-testid="article-title"]').should("have.text", "Article 1");
    cy.get('[data-testid="article-link"]').should(
      "have.attr",
      "href",
      "https://nytimes.com/1"
    );
  });

  it("navigates back home from article page", () => {
    cy.visit("/article/1");
    cy.get('[data-testid="back-button"]').click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("handles API error", () => {
    cy.mockApi({ status: "error", message: "API Error" });
    cy.visit("/");
    cy.get('[data-testid="error-message"]').should(
      "have.text",
      "Error fetching articles"
    );
  });

  it("tests pagination", () => {
    cy.get('[data-testid="page-button-2"]').click();
    cy.get('[data-testid="article-card"]').should("have.length.at.most", 8);
  });

  it("tests responsive design", () => {
    cy.viewport("iphone-x");
    cy.get('[data-testid="article-card"]').should(
      "have.css",
      "flex-direction",
      "column"
    );
    cy.viewport("macbook-15");
    cy.get('[data-testid="article-card"]').should(
      "have.css",
      "display",
      "grid"
    );
  });
});
