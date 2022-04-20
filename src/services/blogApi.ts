import {
  IArticle,
  IArticles,
  IRegistrationBody,
  IUserResponse,
  IErrorResponse,
  IAuthenticationBody,
  IEditBody,
  IArticleFormBody,
} from "../types";

interface IProps {
  article: IArticle;
}

const baseUrl = "https://kata.academy:8021/api";

export const getArticles = async (currentPage: number): Promise<IArticles> => {
  const OffSetPage = (currentPage - 1) * 5;
  const response = await fetch(
    `${baseUrl}/articles?offset=${OffSetPage}&limit=5`
  );

  if (!response.ok) throw new Error("Could not get data");
  return response.json();
};

export const getArticle = async (id: string): Promise<IProps> => {
  const response = await fetch(`${baseUrl}/articles/${id}`);
  if (!response.ok)
    throw new Error(
      `https://kata.academy:8021/api/articles/${id} , received ${response.status}`
    );
  return response.json();
};

export const registrationRequest = async (
  body: IRegistrationBody
): Promise<IUserResponse & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const authenticationRequest = async (
  body: IAuthenticationBody
): Promise<IUserResponse & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const createArticleRequest = async (
  body: IArticleFormBody,
  token: string
): Promise<IArticleFormBody & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const updateArticleRequest = async (
  body: IArticleFormBody,
  token: string,
  slug: string
): Promise<IArticleFormBody & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/articles/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const deleteArticleRequest = async (
  slug: string,
  token: string
): Promise<IProps & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/articles/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  });
  return response.json();
};

export const getUser = async (token: string): Promise<IUserResponse> => {
  const response = await fetch(`${baseUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok)
    throw new Error(
      `Could not fetch ${baseUrl}/user , received ${response.status}`
    );
  return response.json();
};

export const editProfileRequest = async (
  body: IEditBody,
  token: string
): Promise<IUserResponse & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const addFavorite = async (
  token: string,
  slug: string
): Promise<IProps & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Token ${token}`,
    },
  });
  return response.json();
};

export const deleteFavorite = async (
  token: string,
  slug: string
): Promise<IProps & IErrorResponse> => {
  const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.json();
};
