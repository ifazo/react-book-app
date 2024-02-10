export interface IAuth {
  name?: string;
  email: string;
  password: string;
}

export interface IBook {
  _id: string;
  title: string;
  isbn: string;
  publicationDate: string;
  pageCount: number;
  thumbnailUrl: string;
  shortDdescription: string;
  longDescription: string;
  authors: string[];
  categories: string[];
  email?: string;
  date?: string;
}

export interface IReview {
  _id: string;
  bookId: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  details: string;
}

export interface IStatus {
  _id: string;
  bookId: string;
  email: string;
  status: string;
  title: string;
  author: string;
  category: string;
}