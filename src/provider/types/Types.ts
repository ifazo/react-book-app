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
  email: string;
  status: string;
  bookId: string;
  title: string;
  author: string;
  genre: string;
}