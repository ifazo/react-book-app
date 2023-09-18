export interface IAuth {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  date: string;
}

export interface IProduct {
  _id: string;
  username: string;
  email: string;
  title: string;
  price: number;
  description: string;
  author: string;
  genre: string;
  date: string;
  image: string;
  file: string;
  imgUrl: string;
}

export interface IReview {
  _id: string;
  bookId: string;
  name: string;
  email: string;
  rating: string;
  title: string;
  details: string;
  date: string;
}

export interface IStatus {
  _id: string;
  status: string;
  bookId: string;
  userId: string;
  email: string;
  title: string;
  author: string;
  genre: string;
}