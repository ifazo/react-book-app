import { auth } from "../../firebase/firebase.config";
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
    name?: string | null;
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredential {
  name?: string;
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    name: null,
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/create",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

export const googleLogin = createAsyncThunk("user/login/google", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data.user.email;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.name = action.payload;
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.name = action.payload;
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.name = null;
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
        console.error(action.error);
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.name = action.payload;
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.name = null;
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
        console.error(action.error);
      });
      builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user.name = action.payload;
        state.user.email = action.payload;
        state.isLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.user.name = null;
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
        console.error(action.error);
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
