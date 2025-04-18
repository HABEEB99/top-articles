import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePopularArticles } from "../../hooks/use-popular-articles";
import { fetchPopularArticles } from "../../api/fetch-articles";

jest.mock("../../api/fetch-articles");

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockData = {
  status: "ok",
  results: [{ id: 1, title: "Test Article" }],
};

describe("usePopularArticles", () => {
  beforeEach(() => {
    (fetchPopularArticles as jest.Mock).mockClear();
  });

  test("fetches articles successfully", async () => {
    (fetchPopularArticles as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => usePopularArticles(), { wrapper });
    expect(result.current.isLoading).toBe(true);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
  });

  test("handles fetch error", async () => {
    (fetchPopularArticles as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );
    const { result } = renderHook(() => usePopularArticles(), { wrapper });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Failed to fetch articles");
  });
});
