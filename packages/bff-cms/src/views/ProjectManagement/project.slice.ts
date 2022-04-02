import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'utils/request';
// Define a type for the slice state

export interface ProjectGetListSync {
  _id: string;
  projectDesc: string;
  projectName: string;
}
export interface ProjectState {
  visible: boolean;
  id: string;
  list: ProjectGetListSync[];
}

// Define the initial state using that type
const initialState: ProjectState = {
  visible: false,
  id: '',
  list: [],
};

// First, create the thunk
export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async (query?: string) => {
    const { code, data } = await request.get('/api/project/list', { query });
    return code === 0 ? data : [];
  },
);

export const projectSlice = createSlice({
  name: 'project',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state, action) => {
      state.visible = !state.visible;
      state.id = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      // Add user to the state array
      state.list = action.payload;
    });
  },
});

export const { change } = projectSlice.actions;

export default projectSlice.reducer;
