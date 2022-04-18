import React, { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../Header";
import { ArticlesList } from "../ArticlesList";
import { ArticleFull } from "../ArticlesFull";
import { NotFound } from "../NotFound";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import ProfileEditForm from "../EditForm";
import "../App/App.scss";
import "antd/dist/antd.css";

const App: FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles/" element={<ArticlesList />} />
          <Route path="/articles/:id" element={<ArticleFull />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="profile" element={<ProfileEditForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
