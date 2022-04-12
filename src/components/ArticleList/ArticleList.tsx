import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getNewArticles } from "../../store/actions";

export const ArticleList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="articles"></div>;
};
