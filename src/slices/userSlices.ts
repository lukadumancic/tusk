import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/ApiService";

const userInitialState: any = {
  id: null,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  token: "",
  errorReg: "",
  errorLog: "",
  isLoggedIn: false,
};

export const getUserData = createAsyncThunk(
  "getUserData",
  async (_, { dispatch }) => {
    const data = await apiService.get("/users/me");
    dispatch(setUserData(data));
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }: any, { dispatch }) => {
    const data = await apiService.post("/users/login", { username, password });
    if (data.token) {
      apiService.setToken(data.token);
    }
    dispatch(getUserData());
    return { ...data, username };
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
    logoutUser(state) {
      state.isLoggedIn = false;
    },
    setUserData(state, action: PayloadAction<any>) {
      state.companyId = action.payload.companyId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      state.errorLog = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.errorLog = "Wrong username or password";
    },
    [registerUser.fulfilled]: (state, action) => {
      state = {
        ...state,
        ...action.payload,
        errorReg: "",
      };
    },
    [registerUser.rejected]: (state, action) => {
      state.errorReg = "Wrong email";
    },
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
