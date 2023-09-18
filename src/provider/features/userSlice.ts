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
  user: object | null;
  error: boolean | string | null;
  loading: boolean;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/user/create",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/user/login",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  }
);

export const googleLogin = createAsyncThunk("user/login/google", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object | null>) => {
      state.user = action.payload;
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
        state.user = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message!;
      });
    
    builder
      .addCase(loginUser.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message!;
      });
    
      builder
      .addCase(googleLogin.pending, (state) => {
        state.user = null;
        state.loading = true;
        state.error = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
