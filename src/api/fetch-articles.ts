import axios from "axios";
import { IArticles } from "../interfaces/articles-interface";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchPopularArticles = async (): Promise<IArticles> => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch articles");
  }
};
