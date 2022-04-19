import React, { FC } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";

import Header from "../Header";
import { ArticlesList } from "../ArticlesList";
import { ArticleFull } from "../ArticlesFull";
import { NotFound } from "../NotFound";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfileEditForm from "../EditForm";
import FormAddArticle from "../FormArticle";

import "../App/App.scss";
import "antd/dist/antd.css";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles/" element={<ArticlesList />} />
          <Route path="/articles/:id" element={<ArticleFull />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<ProfileEditForm />} />
          <Route path="/new-article" element={<FormAddArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
