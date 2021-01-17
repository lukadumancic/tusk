import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/ApiService";

const userInitialState: any = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  errorReg: "",
  errorLog: "",
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }: any, { dispatch }) => {
    const data = await apiService.post("/users/login", { username, password });
    return data;
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData: any, { dispatch }) => {
    const data = await apiService.post("/users", userData);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      console.log(action);
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.errorLog = '';
    },
    [loginUser.rejected]: (state, action) => {
      state.errorLog = "Wrong username or password";
    },
    [registerUser.fulfilled]: (state, action) => {
      state = {
        ...state,
        ...action.payload,
        errorReg: ''
      };
    },
    [registerUser.rejected]: (state, action) => {
      state.errorReg = "Wrong email";
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
