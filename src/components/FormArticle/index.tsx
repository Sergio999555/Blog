import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import { FormAddTags } from "../FormTags";
import { IArticle, IArticleFormBody, IFormDataArticle } from "../../types";
import {
  createArticleRequest,
  getArticle,
  updateArticleRequest,
} from "../../services/blogApi";
import { InputFormCreateArticleProps } from "../../config";
import InputForm from "../InputForm";
import { Loader } from "../Loader";

import "../FormArticle/style.scss";

export const FormAddArticle: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataArticle>({ mode: "onChange" });

  const [cookies] = useCookies(["token"]);
  const [tagList, setTagList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<IArticle | null>(null);
  const { id }: any = useParams();
  const navigate = useNavigate();

  if (cookies.token === undefined) navigate("/");

  useEffect(() => {
    setLoading(id);
    if (!id) setArticle(null);
    if (id) {
      getArticle(id)
        .then((value) => {
          setLoading(false);
          setArticle(value.article);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    setTagList(article ? article.tagList : []);
  }, [article]);

  const onSubmit = (data: IFormDataArticle) => {
    const { title, description, body } = data;
    const reqBody: IArticleFormBody = {
      article: { title, description, body, tagList },
    };

    if (id && article) {
      updateArticleRequest(reqBody, cookies.token, article.slug)
        .then((value) => {
          navigate("/articles/");
        })
        .catch((err) => console.log(err));
    } else {
      createArticleRequest(reqBody, cookies.token)
        .then((value) => {
          navigate("/articles/");
        })
        .catch((err) => console.log(err));
    }
  };

  type inputNames = "body" | "title" | "description";

  const contentInput = InputFormCreateArticleProps.map((input) => {
    const { rules, ...propsInput } = input;
    const defaultValue = article !== null ? article[input.name] : undefined;
    const propsInputWithError = { ...propsInput, errors, defaultValue };

    return (
      <InputForm
        key={input.name}
        {...propsInputWithError}
        {...register(propsInput?.name as inputNames)}
      />
    );
  });

  const addedTags = tagList.map((item) => (
    <div key={item} className="tags">
      <InputForm value={item} type="text" name="" readOnly />
      <button
        className="tags__button--del"
        onClick={() => setTagList(tagList.filter((tag) => tag !== item))}
      >
        Delete
      </button>
    </div>
  ));

  const titleForm = article ? "Edit article" : "Create new article";

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="formArticle">
        <div>
          <h2 className="formArticle__header"> {titleForm}</h2>
        </div>

        <div className="formArticle__createArticle">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {contentInput}

            <button type="submit" className="formArticle__button">
              Send
            </button>
          </form>
        </div>

        <div className="tags">
          <span className="formArticle__title">Tags</span>
          {addedTags}
          <FormAddTags
            onAdd={(value) =>
              setTagList([...tagList.filter((tag) => tag !== value), value])
            }
          />
        </div>
      </div>
    </>
  );
};
