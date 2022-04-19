import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { connect, ConnectedProps } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";
import * as actions from "../../store/actions";
import InputForm from "../InputForm";
import {
  FormDataSignUp,
  RegistrationBody,
  ErrorResponse,
  ErrorResponseKey,
  InputProps,
  State,
} from "../../types";
import { InputFormSignUpProps } from "../../config";
import { registrationRequest } from "../../services/blogApi";
import "../SignUp/style.scss";

const mapStateToProps = (state: State) => {
  const { user } = state;
  return { user };
};

const responseErrorSearch = (
  errorObj: ErrorResponse,
  props: InputProps
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

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const SignUp: FC<PropsFromRedux> = ({ setUserAction }) => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [responseErrorObj, setResponseError] = useState<ErrorResponse>({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignUp>({ mode: "onChange" });
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  if (cookies.token !== undefined) navigate("/");

  const onSubmit = (data: FormDataSignUp) => {
    if (!agree) return;
    const { username, email, password } = data;
    const body: RegistrationBody = {
      user: { username, email, password },
    };
    registrationRequest(body)
      .then((value) => {
        if (value.errors) {
          const responseError = value;
          setResponseError(responseError);
        }
        const { token } = value.user;
        setCookies("token", token);
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

export default connector(SignUp);
