import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.jsx';
import { Toaster } from 'react-hot-toast';

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}