import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DashbordState {
  visible: boolean;
}

// Define the initial state using that type
const initialState: DashbordState = {
  visible: false,
};

export const dashbordSlice = createSlice({
  name: 'dashbord',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state) => {
      state.visible = !state.visible;
      return state;
    },
  },
});

export const { change } = dashbordSlice.actions;

export default dashbordSlice.reducer;
