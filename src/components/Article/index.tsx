import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { HeartTwoTone } from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { connect, ConnectedProps } from "react-redux";
import { useCookies } from "react-cookie";

import { IArticle, IState } from "../../types";

import "../Article/style.scss";
import {
  deleteArticleRequest,
  addFavorite,
  deleteFavorite,
} from "../../services/blogApi";

const Article: FC<IArticle & PropsFromRedux> = ({
  title,
  author: { username, image },
  createdAt,
  tagList,
  favorited,
  favoritesCount,
  description,
  slug,
  full,
  body,
  user,
}) => {
  const [isModalDelete, setIsModalDelete] = useState<boolean>(false);
  const [currentLikes, setCurrentLikes] = useState({
    favoritesCount,
    favorited,
  });
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const addDeleteLikes = () => {
    if (cookies.token === undefined) return;
    if (currentLikes.favorited) {
      deleteFavorite(cookies.token, slug)
        .then((value) => {
          setCurrentLikes({
            favoritesCount: value.article.favoritesCount,
            favorited: value.article.favorited,
          });
        })
        .catch((err) => console.log(err));
    }
    addFavorite(cookies.token, slug)
      .then((value) => {
        setCurrentLikes({
          favoritesCount: value.article.favoritesCount,
          favorited: value.article.favorited,
        });
      })
      .catch((err) => console.log(err));
  };

  const deleteArticle = () => {
    deleteArticleRequest(slug, cookies.token)
      .then(() => {
        navigate("/articles");
      })
      .catch((err) => console.log(err));
  };

  const modalDelete = isModalDelete && (
    <div className="modalWindow">
      <span>Are you sure to delete this arcticle</span>
      <div className="modalWindow__button">
        <button className="modalWindow__button--item" onClick={deleteArticle}>
          Yes
        </button>
        <button
          className="modalWindow__button--item"
          onClick={() => setIsModalDelete(false)}
        >
          No
        </button>
      </div>
    </div>
  );

  const editButtons = user?.username === username && full && (
    <div className="article__button">
      <button
        className="article__button--delete"
        onClick={() => setIsModalDelete(true)}
      >
        Delete
      </button>
      {modalDelete}
      <button
        className="article__button--edit"
        onClick={() => navigate(`/articles/${slug}/edit`)}
      >
        Edit
      </button>
    </div>
  );

  return (
    <article className="article">
      <div className="article__header">
        <div className="article__header--left">
          {!full ? (
            <Link to={`${slug}`}>
              <h3 className="article__header-title">{title}</h3>
            </Link>
          ) : (
            <h3 className="article__header-title">{title}</h3>
          )}

          <button
            className="article__header-button"
            type="button"
            onClick={addDeleteLikes}
          >
            <HeartTwoTone twoToneColor="#1890FF" />
            <span>{currentLikes.favoritesCount}</span>
          </button>
          <div className="break" />
          {tagList.length > 0 && (
            <ul className="article__tags">
              {tagList.map((item) => (
                <li key={uuid()} className="article__tag">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="article__header--right">
          <div className="article__info">
            <h3 className="article__author">{username}</h3>
            <span className="article__date">
              {format(new Date(createdAt), "d MMMM, yyyy")}
            </span>
          </div>
          <img className="article__avatar" src={image} alt="avatar" />
        </div>
      </div>

      <div>{editButtons}</div>

      <div className="article__body">
        <span className="article__description">{description}</span>
        {full && <ReactMarkdown>{body}</ReactMarkdown>}
      </div>
    </article>
  );
};

function mapStateToProps(state: IState) {
  const { user } = state;
  return {
    user,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ArticleWithConnector = connector(Article);

export { ArticleWithConnector as Article };
