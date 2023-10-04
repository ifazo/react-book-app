import { auth } from "../../config/firebase.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface IUserState {
  user: {
    email: string | null;
  };
  error: boolean | string | null;
  loading: boolean;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "/api/auth/sign-up",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  "/api/auth/sign-in",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const googleLogin = createAsyncThunk(
  "/api/auth/user/login/google",
  async () => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean | string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.user.email = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.loading = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.user.email = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.loading = false;
        state.error = action.error.message!;
      });

    builder
      .addCase(googleLogin.pending, (state) => {
        state.user.email = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user.email = null;
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice;
