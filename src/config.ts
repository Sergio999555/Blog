import { InputPropsWithoutErrors } from "./types";

export const InputFormSignUpProps: InputPropsWithoutErrors[] = [
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage: "Username must be between 3 and 20 characters",
    responseError: null,
    id: `${Math.random()}`,
    rules: {
      required: true,
      minLength: 3,
      maxLength: 20,
    },
  },
  {
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "Email address",
    id: `${Math.random()}`,
    errorMessage: "Email address must be correct",
    responseError: null,
    rules: {
      required: true,
      pattern: /^[^@]+@[^@.]+\.[^@]+$/,
    },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Password",
    id: `${Math.random()}`,
    errorMessage: "Password must be between 6 and 40 characters",
    responseError: null,
    rules: {
      required: true,
      maxLength: 40,
      minLength: 8,
    },
  },
  {
    label: "Repeat Password",
    name: "repeatPassword",
    type: "password",
    placeholder: "Repeat Password",
    id: `${Math.random()}`,
    errorMessage: "Passwords should match!",
    responseError: null,
    rules: {
      required: true,
    },
  },
];

export const InputFormSignInProps: InputPropsWithoutErrors[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "Email address",
    id: `${Math.random()}`,
    type: "email",
    errorMessage: "Email address must be correct",
    responseError: null,
    rules: {
      required: true,
      pattern: /^[^@]+@[^@.]+\.[^@]+$/,
    },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    id: `${Math.random()}`,
    errorMessage: "Password must be between 6 and 40 characters",
    responseError: null,
    rules: {
      required: true,
      maxLength: 40,
      minLength: 6,
    },
  },
];

export const InputFormEditProps: InputPropsWithoutErrors[] = [
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Username",
    id: `${Math.random()}`,
    errorMessage: "Username must be between 3 and 20 characters",
    responseError: null,
    rules: {
      required: true,
      maxLength: 20,
      minLength: 3,
    },
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Email address",
    id: `${Math.random()}`,
    errorMessage: "Email address must be correct",
    responseError: null,
    rules: {
      required: true,
      pattern: /^[^@]+@[^@.]+\.[^@]+$/,
    },
  },
  {
    name: "password",
    label: "New password",
    type: "password",
    placeholder: "New password",
    errorMessage: "Password must be between 6 and 40 characters",
    responseError: null,
    id: `${Math.random()}`,
    rules: {
      required: true,
      maxLength: 40,
      minLength: 6,
    },
  },
  {
    label: "Avatar image (url)",
    name: "image",
    type: "url",
    placeholder: "Avatar image",
    errorMessage: "enter correct url",
    id: `${Math.random()}`,
    responseError: null,
    rules: {
      required: true,
      pattern:
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/,
    },
  },
];
