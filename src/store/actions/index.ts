import { getArticles } from "../../services/blogApi";

const addArticles = (articles: any) => ({
  type: "ADD_ARTICLES",
  payload: articles,
});

const updateLoading = (value: any) => ({
  type: "UPDATE_LOADING",
  payload: value,
});

const getNewArticles = () => async (dispatch: any) => {
  const data = await getArticles();
  dispatch(addArticles(data));
  dispatch(updateLoading(false));
};

export { addArticles, updateLoading, getNewArticles };
