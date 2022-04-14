import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
// import { ISubmitUser } from "../../types";
import "../SignIn/style.scss";

export const SignIn = () => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="loginForm__header">Sign In</h2>
        <span className="loginForm__title">Email address</span>

        <input
          className="loginForm__input"
          {...register("email", {
            required: true,
            minLength: 6,
            maxLength: 24,
            validate: (input) => isEmail(input),
          })}
          placeholder="Email address"
        />

        <span className="loginForm__title">Password</span>

        <input
          className="loginForm__input"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          placeholder="Password"
        />

        <button type="submit" className="loginForm__button">
          Login
        </button>
      </form>
      <span className="loginForm__footer">
        Don`t have an account? <Link to="/sign-up">Sign Up</Link>
      </span>
    </div>
  );
};
