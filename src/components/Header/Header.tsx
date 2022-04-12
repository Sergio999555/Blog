import React from "react";

import "../Header/Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <button className="header__title">Realworld Blog</button>
      <div className="header__button">
        <button className="header__button-item">Sign In</button>
        <button className="header__button-item">Sign Up</button>
      </div>
    </header>
  );
};
