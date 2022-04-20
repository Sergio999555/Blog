import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { connect, ConnectedProps } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";

import * as actions from "../../store/actions";
import InputForm from "../InputForm";
import {
  IFormDataSignUp,
  IRegistrationBody,
  IErrorResponse,
  ErrorResponseKey,
  IInputProps,
  IState,
} from "../../types";
import { InputFormSignUpProps } from "../../config";
import { registrationRequest } from "../../services/blogApi";

import "../SignUp/style.scss";

const responseErrorSearch = (
  errorObj: IErrorResponse,
  props: IInputProps
): string | undefined => {
  if (errorObj.errors) {
    const errkeys = Object.keys(errorObj.errors);
    const errkey = errkeys.find(
      (key) => props.name === key
    ) as ErrorResponseKey;
    return errkey !== undefined ? errorObj.errors[errkey]?.join() : undefined;
  }
  return undefined;
};

const SignUp: FC<PropsFromRedux> = ({ setUserAction }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [responseErrorObj, setResponseError] = useState<IErrorResponse>({});
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormDataSignUp>({ mode: "onChange" });

  if (cookies.token !== undefined) navigate("/");

  const onSubmit = (data: IFormDataSignUp) => {
    if (!agree) return;
    const { username, email, password } = data;
    const body: IRegistrationBody = {
      user: { username, email, password },
    };
    registrationRequest(body)
      .then((value) => {
        if (value.errors) {
          setResponseError(value);
        }
        const { token } = value.user;
        setCookie("token", token);
        setUserAction(value.user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  type inputNames = "email" | "username" | "password" | "repeatPassword";

  const contentInput = InputFormSignUpProps.map((input) => {
    const { rules, ...propsInput } = input;
    const responseError = responseErrorSearch(responseErrorObj, propsInput);
    const propsInputWithError = { ...propsInput, errors, responseError };
    return (
      <InputForm
        key={input.name}
        {...propsInputWithError}
        {...register(propsInput?.name as inputNames)}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registerForm">
      <h2 className="registerForm__header">Create new account</h2>
      {contentInput}
      <Checkbox
        className="registerForm__checkbox"
        name="I agree"
        onChange={() => setAgree(!agree)}
      >
        I agree to the processing of my personal information
      </Checkbox>
      <button type="submit" className="registerForm__button">
        Create
      </button>
      <footer className="registerForm__footer">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </footer>
    </form>
  );
};

const mapStateToProps = (state: IState) => {
  const { user } = state;
  return { user };
};

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SignUpWithConnector = connector(SignUp);

export { SignUpWithConnector as SignUp };
