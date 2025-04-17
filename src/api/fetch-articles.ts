import axios from "axios";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=${API_KEY}`;

export const fetchPopularArticles = async () => {
  const { data } = await axios.get(URL);
  return data;
};
