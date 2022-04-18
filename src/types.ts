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

export type ErrorState = {
  hasError: boolean;
};

export enum Actions {
  getArticles = "GET_ARTICLES",
  setUser = "SET_USER",
}

export type ActionSetUser = {
  type: Actions.setUser;
  payload: User | null;
};

export type User = {
  [key: string]: any;
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type State = {
  user: User | null;
};

export type InputProps = {
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
};

export type InputPropsWithoutErrors = Omit<InputProps, "errors">;

export type FormDataSignIn = {
  email: string;
  password: string;
};

export type FormDataSignUp = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type FormDataEdit = {
  username: string;
  email: string;
  password: string;
  image: string;
};

export type FormDataArticle = {
  title: string;
  description: string;
  body: string;
};

export type FormatDataTags = {
  tag: string;
};

export type EditBody = {
  user: {
    username: string;
    email: string;
    password: string;
    image: string;
  };
};

export type RegistrationBody = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type AuthenticationBody = {
  user: {
    email: string;
    password: string;
  };
};

export type ArticleFormBody = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
};

export type UserResponse = {
  user: User;
};

export type ErrorResponse = {
  errors?: {
    email?: string[];
    username?: string[];
  };
};

export type ErrorResponseKey = "email" | "username";
