import { createSlice } from '@reduxjs/toolkit';

export interface NginxState {
  origin: string;
  rootPath: string;
  port: number;
  ipv4: string;
  ipv6: string;
  proxySetHeader: string;
  proxyPass: string;
}

export interface interfaceFormState {
  path: string;
  originId: string;
  type: number;
}

// Define the initial state using that type
const initialState: {
  nginxState: NginxState;
  interfaceFormState: interfaceFormState;
} = {
  interfaceFormState: {
    path: '',
    originId: '',
    type: 0,
  },
  nginxState: {
    origin: '',
    rootPath: '',
    port: 80,
    ipv4: '',
    ipv6: '',
    proxySetHeader: '',
    proxyPass: '',
  },
};

export const nginxSlice = createSlice({
  name: 'nginx',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateNginxData: (state, action) => {
      for (const key in state.nginxState) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          state.nginxState[key] = action.payload[key];
        } else if (key === 'port') {
          state.nginxState[key] = 80;
        } else {
          state.nginxState[key] = '';
        }
      }
      return state;
    },
    updateFormData: (state, action) => {
      for (const key in state.interfaceFormState) {
        if (Object.prototype.hasOwnProperty.call(action.payload, key)) {
          state.interfaceFormState[key] = action.payload[key];
        } else {
          state.interfaceFormState[key] = '';
        }
      }
      return state;
    },
  },
});

export const { updateNginxData, updateFormData } = nginxSlice.actions;

export default nginxSlice.reducer;
