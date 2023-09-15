import './App.css';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.jsx';
import { Toaster } from 'react-hot-toast';
import { useAppDispatch } from './provider/hook.js';
import { onAuthStateChanged } from 'firebase/auth';
import { setLoading, setUser } from './provider/features/userSlice.js';
import { auth } from './firebase/firebase.config.js';

export default function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [ dispatch ]);

  useEffect(() => {
    dispatch(setLoading(true));
  }, [ dispatch ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}