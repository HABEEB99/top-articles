import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import ArticlePage from "../pages/article-page";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/article/:id", element: <ArticlePage /> },
]);
