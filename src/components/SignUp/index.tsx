import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Checkbox from "antd/lib/checkbox/Checkbox";
import isEmail from "validator/lib/isEmail";
// import { ISubmitUser } from "../../types";
import "../SignUp/style.scss";

export const SignUp = () => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="registerForm__header">Create new account</h2>

        <span className="registerForm__title">Username</span>
        <input
          className="registerForm__input"
          {...register("username", {
            required: true,
            minLength: 6,
            maxLength: 24,
          })}
          placeholder="Email address"
        />

        <span className="registerForm__title">Email address</span>
        <input
          className="registerForm__input"
          {...register("email", {
            required: true,
            minLength: 6,
            maxLength: 24,
            validate: (input) => isEmail(input),
          })}
          placeholder="Email address"
        />

        <span className="registerForm__title">Password</span>
        <input
          className="registerForm__input"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          placeholder="Password"
        />

        <span className="registerForm__title">Repeaet password</span>
        <input
          className="registerForm__input"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          placeholder="Password"
        />

        <Checkbox className="registerForm__checkbox">
          I agree to the processing of my personal information
        </Checkbox>

        <button type="submit" className="registerForm__button">
          Create account
        </button>
      </form>
      <span className="registerForm__footer">
        Don`t have an account? <Link to="/sign-in">Sign In</Link>
      </span>
    </div>
  );
};
