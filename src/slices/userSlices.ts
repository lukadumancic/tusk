import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/ApiService";

const userInitialState: any = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }: any, { dispatch }) => {
    const data = await apiService.post("/users/login", { username, password });
    dispatch(
      setUserData({
        isLoggedIn: true,
      })
    );
    return true;
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData: any, { dispatch }) => {
    const data = await apiService.post("/users", userData);
    console.log(data);
  }
);
