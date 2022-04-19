import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import InputForm from "../InputForm";
import { FormDataSignIn, State, AuthenticationBody } from "../../types";
import { InputFormSignInProps } from "../../config";
import * as actions from "../../store/actions";
import { authenticationRequest } from "../../services/blogApi";
import "../SignIn/style.scss";

const mapStateToProps = (state: State) => {
  const { user } = state;
  return { user };
};

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SignIn: FC<PropsFromRedux> = ({ setUserAction }) => {
  const [responseError, setResponseError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignIn>({ mode: "onChange" });
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  if (cookies.token !== undefined) navigate("/");

  const onSubmit = (data: FormDataSignIn) => {
    setResponseError(false);
    const { email, password } = data;
    const body: AuthenticationBody = {
      user: { email, password },
    };
    authenticationRequest(body)
      .then((value) => {
        if (value.errors) setResponseError(true);

        const { token } = value.user;
        setCookies("token", token);
        setUserAction(value.user);
        setResponseError(false);
        navigate("/");
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
        {responseError && <span>password or email is not correct</span>}
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

export default connector(SignIn);
