export interface ISlug {
  slug: string;
}

export interface IArticle {
  author: IAuthor;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  body?: string;
  id: number;
}

export interface IAuthor {
  following: boolean;
  image: string;
  username: string;
}
