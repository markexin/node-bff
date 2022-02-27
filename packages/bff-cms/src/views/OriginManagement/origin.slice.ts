import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ProjectState {
  visible: boolean;
}

// Define the initial state using that type
const initialState: ProjectState = {
  visible: false,
};

export const projectSlice = createSlice({
  name: 'project',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state) => {
      state.visible = !state.visible;
      return state;
    },
  },
});

export const { change } = projectSlice.actions;

export default projectSlice.reducer;
