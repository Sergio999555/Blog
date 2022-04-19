import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";

import { Error } from "../Error";
import { Article } from "../Article";
import { getArticles } from "../../services/blogApi";
import { IArticles } from "../../types";
import { Loader } from "../Loader";

import "../ArticlesList/style.scss";

export const ArticlesList: FC = () => {
  const [articlesObj, setArticlesObj] = useState<IArticles | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let content = null;
  let pages = 0;

  useEffect(() => {
    setLoading(true);
    getArticles(currentPage)
      .then((value) => {
        setLoading(false);
        setArticlesObj(value);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [currentPage]);

  if (articlesObj) {
    const { articles, articlesCount } = articlesObj;
    pages = articlesCount;
    content = articles.map((article) => (
      <Article key={article.slug} {...article} />
    ));
  }

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {loading && !error ? <Loader /> : content}
      {error && <Error />}
      <Pagination
        size="small"
        showSizeChanger={false}
        onChange={onChangePage}
        pageSize={5}
        total={pages}
        current={currentPage}
      />
    </>
  );
};
