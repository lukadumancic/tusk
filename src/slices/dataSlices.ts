import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/ApiService";

const dataKeys = [
  "aspects",
  "comments",
  "companies",
  "projects",
  "reactions",
  "skills",
  "sprints",
  "tags",
  "tasks",
  "teams",
];

const dataInitialState: any = {
  selectedCompanyId: -1,
  selectedTeamId: -1,
  selectedProjectId: -1,
};
const reducers: any = {};
const extraReducers: any = {};
const asyncActions: any = {};

dataKeys.forEach((key) => {
  dataInitialState[key] = [];
  const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  reducers["add" + capKey] = (state: any, action: PayloadAction<any[]>) => {
    state[key] = action.payload;
  };
  asyncActions["get" + capKey] = createAsyncThunk(
    "get" + capKey,
    async (_, { dispatch }) => {
      const data = await apiService.get("/" + key);
      dispatch(reducers["add" + capKey](data));
    }
  );
  extraReducers[asyncActions["get" + capKey].fullfiled] = (
    state: any,
    action: PayloadAction<any[]>
  ) => {
    state[key] = action.payload;
  };
});

const dataSlice = createSlice({
  name: "data",
  initialState: dataInitialState,
  reducers: {
    ...reducers,
    setSelectedCompanyId(state: any, action: PayloadAction<number>) {
      state.selectedCompanyId = action.payload;
    },
    setSelectedTeamId(state: any, action: PayloadAction<number>) {
      state.selectedTeamId = action.payload;
    },
    setSelectedProjectId(state: any, action: PayloadAction<number>) {
      state.selectedProjectId = action.payload;
    },
  },
  extraReducers: {
    ...extraReducers,
  },
});

export const {
  setSelectedCompanyId,
  setSelectedTeamId,
  setSelectedProjectId,
} = dataSlice.actions;
export default dataSlice.reducer;

dataKeys.forEach((key) => {
  const capKey = key.charAt(0).toUpperCase() + key.slice(1);
  asyncActions["get" + capKey] = createAsyncThunk(
    "get" + capKey,
    async (_, { dispatch }) => {
      const data = await apiService.get("/" + key);
      dispatch(dataSlice.actions["add" + capKey](data));
    }
  );
});

export const getData = createAsyncThunk("getData", async (_, { dispatch }) => {
  Object.values(asyncActions).forEach((asyncAction: any) => {
    dispatch(asyncAction());
  });
});

export const createNew = createAsyncThunk(
  "createNew",
  async ({ route, data }: { route: string; data: any }, { dispatch }) => {
    await apiService.post(route, data);

    dispatch(getData());
  }
);

export const deleteItem = createAsyncThunk(
  "deleteItem",
  async (route: string, { dispatch }) => {
    await apiService.delete(route);

    dispatch(getData());
  }
);

export const editItem = createAsyncThunk(
  "editItem",
  async ({ route, data }: { route: string; data: any }, { dispatch }) => {
    await apiService.put(route, data);

    dispatch(getData());
  }
);

export { asyncActions };
