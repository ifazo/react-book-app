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
  date: Date;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReview {
  bookId: string;
  email: string;
  rating: string;
  title: string;
  details: string;
  createdAt: string;
}

export interface IStatus {
  bookId: string;
  email: string;
  status: string;
  title: string;
  author: string;
  genre: string;
}