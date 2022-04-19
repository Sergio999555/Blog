import React, { FC } from "react";
import { IArticle } from "../../types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { HeartTwoTone } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import "../Article/style.scss";

export const Article: FC<IArticle> = ({
  title,
  author: { username, image },
  createdAt,
  tagList,
  favoritesCount,
  description,
  slug,
  full,
  body,
}) => {
  return (
    <article className="article">
      <div className="article__header">
        <div className="article__header-left">
          {!full ? (
            <Link to={`${slug}`}>
              <h3 className="article__header-title">{title}</h3>
            </Link>
          ) : (
            <h3 className="article__header-title">{title}</h3>
          )}

          <button className="article__header-button">
            <HeartTwoTone twoToneColor="#1890FF" />
            <span>{favoritesCount}</span>
          </button>
          <div className="break"></div>
          {tagList.length > 0 && (
            <ul className="article__tags">
              {[...tagList].map((item) => (
                <li key={Math.random()} className="article__tag">
                  {item}
                </li> //костыль с key!
              ))}
            </ul>
          )}
        </div>

        <div className="article__header-right">
          <div className="article__info">
            <h3 className="article__author">{username}</h3>
            <span className="article__date">
              {format(new Date(createdAt), "d MMMM, yyyy")}
            </span>
          </div>
          <img className="article__avatar" src={image} alt="avatar" />
        </div>
      </div>

      <div className="article__body">
        <span className="article__description">{description}</span>
        {full ? <ReactMarkdown>{body}</ReactMarkdown> : null}
      </div>
    </article>
  );
};
