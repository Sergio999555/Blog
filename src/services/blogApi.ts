import axios from "axios";

const baseUrl = "https://kata.academy:8021/api/";

const getArticles = async (offset = 0) => {
  const { data } = await axios.get(
    `${baseUrl}articles?limit=5&offset=${offset}`
  );
  console.log(data);
  return data;
};

const getArticle = async (id: number) => {
  const { data } = await axios.get(`${baseUrl}articles/${id}`);
  console.log(data);
  return data;
};

export { getArticles, getArticle };
