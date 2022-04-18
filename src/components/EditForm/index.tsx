import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { connect, ConnectedProps } from "react-redux";
import { InputFormEditProps } from "../../config";
import {
  EditBody,
  ErrorResponse,
  InputProps,
  ErrorResponseKey,
  State,
  FormDataEdit,
} from "../../types";
import { editProfileRequest } from "../../services/blogApi";
import InputForm from "../InputForm";
import * as actions from "../../store/actions";
import "../EditForm/style.scss";

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

const mapStateToProps = (state: State) => {
  const { user } = state;
  return { user };
};

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ProfileEditForm: FC<PropsFromRedux> = ({ user, setUserAction }) => {
  const [responseErrorObj, setResponseError] = useState<ErrorResponse>({});
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataEdit>({ mode: "onChange" });

  if (cookies.token === undefined) navigate("sign-in");

  const onSubmit = (data: FormDataEdit) => {
    const { email, password, image, username } = data;
    const body: EditBody = {
      user: { email, password, image, username },
    };

    editProfileRequest(body, cookies.token)
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

  type inputNames = "image" | "email" | "username" | "password";

  const contentInput = InputFormEditProps.map((input) => {
    const { rules, ...propsInput } = input;
    const responseError = responseErrorSearch(responseErrorObj, propsInput);
    const defaultValue = user !== null ? user[input.name] : undefined;
    const propsInputWithError = {
      ...propsInput,
      errors,
      responseError,
      defaultValue,
    };
    return (
      <InputForm
        key={input.name}
        {...propsInputWithError}
        {...register(propsInput?.name as inputNames)}
      />
    );
  });
  return (
    <div className="editForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="editForm__header">Edit Profile</h2>
        {contentInput}
        <button type="submit" className="editForm__button">
          Save
        </button>
      </form>
    </div>
  );
};

export default connector(ProfileEditForm);
