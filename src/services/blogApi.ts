import { IArticle, IArticles } from "../types";

interface IProps {
  article: IArticle;
}

const baseUrl = "https://kata.academy:8021/api";

export const getArticles = async (currentPage: number): Promise<IArticles> => {
  const OffSetPage = (currentPage - 1) * 5;
  const result = await fetch(
    `${baseUrl}/articles?offset=${OffSetPage}&limit=5`
  );

  if (!result.ok) throw new Error("Could not get data");
  return result.json();
};

export const getArticle = async (id: string): Promise<IProps> => {
  const result = await fetch(`${baseUrl}/articles/${id}`);
  if (!result.ok)
    throw new Error(
      `https://kata.academy:8021/api/articles/${id} , received ${result.status}`
    );
  return result.json();
};
