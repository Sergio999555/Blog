export interface IArticle {
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
