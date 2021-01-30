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
  "users",
];

const dataInitialState: any = {
  selectedCompanyId: -1,
  selectedTeamId: -1,
  selectedProjectId: -1,
  selectedSprintId: -1,
  teamMembers: {},
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
    setSelectedSprintId(state: any, action: PayloadAction<number>) {
      state.selectedSprintId = action.payload;
    },
    setTeamMembers(state: any, action: PayloadAction<any>) {
      state.teamMembers[action.payload.teamId] = action.payload.members;
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
  setSelectedSprintId,
  setTeamMembers,
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
    const response = await apiService.post(route, data);
    if (route === "/sprints") {
      await apiService.post("/aspects", {
        name: "frontend",
        sprintId: response.id,
      });
      await apiService.post("/aspects", {
        name: "backend",
        sprintId: response.id,
      });
    }

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

export const getTeamMembers = createAsyncThunk(
  "getTeamMembers",
  async (teamId: number, { dispatch }) => {
    const data = await apiService.get("/teams/" + teamId + "/members");
    dispatch(setTeamMembers({ teamId, members: data }));
  }
);

export { asyncActions };
