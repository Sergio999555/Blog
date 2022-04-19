import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getArticle } from "../../services/blogApi";
import { IArticle } from "../../types";
import { Article } from "../Article";
import { Loader } from "../Loader";
import { Error } from "../Error";

export const ArticleFull: FC = () => {
  const { id }: any = useParams();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getArticle(id)
      .then((value) => {
        setLoading(false);
        setArticle(value.article);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [id]);

  const content = article && <Article {...(article as IArticle)} full />;

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Error /> : null}
      {content}
    </>
  );
};
