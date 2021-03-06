import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import InputForm from "../InputForm";
import { IFormDataSignIn, IState, IAuthenticationBody } from "../../types";
import { InputFormSignInProps } from "../../config";
import * as actions from "../../store/actions";
import { authenticationRequest } from "../../services/blogApi";

import "../SignIn/style.scss";

const SignIn: FC<PropsFromRedux> = () => {
  const [responseError, setResponseError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataSignIn>({ mode: "onChange" });
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  if (cookies.token !== undefined) navigate("/");

  const onSubmit = (data: IFormDataSignIn) => {
    setResponseError(false);
    const { email, password } = data;
    const body: IAuthenticationBody = {
      user: { email, password },
    };
    authenticationRequest(body)
      .then((value) => {
        if (value.errors) setResponseError(true);
        if (value.user) {
          const { token } = value.user;
          setCookie("token", token);
          setResponseError(false);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  type inputNames = "email" | "password";

  const contentInput = InputFormSignInProps.map((input) => {
    const { rules, ...propsInput } = input;
    const propsInputWithError = { ...propsInput, errors };
    return (
      <InputForm
        key={input.name}
        {...propsInputWithError}
        {...register(propsInput?.name as inputNames)}
      />
    );
  });

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="loginForm__header">Sign In</h2>
        {contentInput}
        {responseError && (
          <span className="loginForm__error">
            Password or email is not correct
          </span>
        )}
        <button type="submit" className="loginForm__button">
          Login
        </button>
        <span className="loginForm__footer">
          Don`t have an account?
          <Link to="/sign-up">&nbsp;Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { user } = state;
  return { user };
};

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SignInWithConnector = connector(SignIn);

export { SignInWithConnector as SignIn };
