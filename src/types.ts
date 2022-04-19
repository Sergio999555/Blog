import { FieldErrors, ValidationRule } from "react-hook-form";

export interface IArticle {
  [key: string]: any;
  full?: boolean;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: false;
  favoritesCount: number;
  author: {
    username: string;
    image: string;
    following: boolean;
  };
}

export interface IArticles {
  articles: IArticle[];
  articlesCount: number;
}

export interface ISubmitUser {
  userName?: string;
  emailAddress?: string;
  password?: string;
  avatar?: string;
}

export interface IErrorState {
  hasError: boolean;
}

export enum Actions {
  getArticles = "GET_ARTICLES",
  setUser = "SET_USER",
}

export interface IActionSetUser {
  type: Actions.setUser;
  payload: IUser | null;
}

export interface IUser {
  [key: string]: any;
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IState {
  user: IUser | null;
}

export interface IInputProps {
  label?: string;
  name: string;
  value?: string;
  type: string;
  readonly?: boolean;
  style?: {
    width?: string;
    nimHeight?: string;
    maxHeight?: string;
  };
  id?: string;
  textarea?: boolean;
  defaultValue?: string;
  tagList?: string[];
  placeholder?: string;
  errors?: FieldErrors;
  errorMessage?: string;
  responseError?: string | null;
  rules?: {
    required?: ValidationRule<boolean>;
    pattern?: ValidationRule<RegExp>;
    minLength?: ValidationRule<number>;
    maxLength?: ValidationRule<number>;
  };
}

export interface IFormDataSignIn {
  email: string;
  password: string;
}

export interface IFormDataSignUp {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IFormDataEdit {
  username: string;
  email: string;
  password: string;
  image: string;
}

export interface IFormDataArticle {
  title: string;
  description: string;
  body: string;
}

export interface IFormatDataTags {
  tag: string;
}

export interface IEditBody {
  user: {
    username: string;
    email: string;
    password: string;
    image: string;
  };
}

export interface IRegistrationBody {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface IAuthenticationBody {
  user: {
    email: string;
    password: string;
  };
}

export interface IArticleFormBody {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}

export interface IUserResponse {
  user: IUser;
}

export interface IErrorResponse {
  errors?: {
    email?: string[];
    username?: string[];
  };
}

export type InputPropsWithoutErrors = Omit<IInputProps, "errors">;
export type ErrorResponseKey = "email" | "username";
