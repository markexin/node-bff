import { createSlice } from '@reduxjs/toolkit';

export interface NginxState {
  origin: string;
  path: string;
  port: number;
  ipv4: string;
  ipv6: string;
  proxySetHeader: string;
  proxyPass: string;
  proxyPassPath: string;
}

// Define the initial state using that type
const initialState: NginxState = {
  origin: '',
  path: '',
  port: 80,
  ipv4: '',
  ipv6: '',
  proxySetHeader: '',
  proxyPass: '',
  proxyPassPath: '',
};

export const nginxSlice = createSlice({
  name: 'nginx',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    update: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { update } = nginxSlice.actions;

export default nginxSlice.reducer;
