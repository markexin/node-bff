import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'utils/request';
// Define a type for the slice state

export interface OriginGetListSync {
  _id: string;
  originPath: string;
  projectName: string;
}
export interface OriginState {
  visible: boolean;
  id: string;
  list: OriginGetListSync[];
}

// Define the initial state using that type
const initialState: OriginState = {
  visible: false,
  id: '',
  list: [],
};

// First, create the thunk
export const fetchOrigin = createAsyncThunk(
  'origin/fetchOrigin',
  async (query?: string) => {
    const { code, data } = await request.get('/api/origin/list', { query });
    return code === 0 ? data : [];
  },
);

export const originSlice = createSlice({
  name: 'origin',
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
    builder.addCase(fetchOrigin.fulfilled, (state, action) => {
      // Add user to the state array
      state.list = action.payload;
    });
  },
});

export const { change } = originSlice.actions;

export default originSlice.reducer;
