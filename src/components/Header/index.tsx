import React from "react";
import { Link } from "react-router-dom";
import "../Header/style.scss";

export const Header = () => {
  return (
    <div className="header">
      <Link to="/articles/">
        <h3 className="header__title">Realworld Blog</h3>
      </Link>
      <div className="header__button">
        <Link to="/sign-in">
          <button className="header__button-item">Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button className="header__button-item">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};
