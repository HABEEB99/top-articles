import axios from "axios";
import { fetchPopularArticles } from "../../api/fetch-articles";

jest.mock("axios");

describe("fetchPopularArticles", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockResponse = {
    data: {
      status: "ok",
      results: [{ id: 1, title: "Test Article" }],
    },
  };

  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test("fetches articles successfully", async () => {
    mockedAxios.get.mockResolvedValue(mockResponse);
    const result = await fetchPopularArticles();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/mostpopular/v2/viewed/30.json"),
      expect.any(Object)
    );
    expect(result).toEqual(mockResponse.data);
  });

  test("throws error on API failure", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));
    await expect(fetchPopularArticles()).rejects.toThrow(
      "Failed to fetch articles"
    );
  });
});
