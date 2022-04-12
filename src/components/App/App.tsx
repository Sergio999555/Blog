import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { ArticleList } from "../ArticleList/ArticleList";
import { Article } from "../Article/Article";
import { NotFound } from "../../NotFound/NotFound";
import "antd/dist/antd.min.css";
import "../App/App.scss";

export const App = () => {
  return (
    <Router>
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};
