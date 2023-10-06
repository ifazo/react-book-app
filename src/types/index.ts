export interface IAuth {
  name?: string;
  email: string;
  password: string;
}

export interface IProduct {
  _id: string;
  id: string;
  user: string;
  email: string;
  title: string;
  price: number;
  genre: string;
  author: string;
  date: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
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
  genre: string;
}