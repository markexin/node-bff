import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface InterfaceState {
  visible: boolean;
}

// Define the initial state using that type
const initialState: InterfaceState = {
  visible: false,
};

export const interfaceSlice = createSlice({
  name: 'interface',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state) => {
      state.visible = !state.visible;
      return state;
    },
  },
});

export const { change } = interfaceSlice.actions;

export default interfaceSlice.reducer;
