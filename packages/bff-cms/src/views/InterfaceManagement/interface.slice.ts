import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'utils/request';
// Define a type for the slice state

// export interface ProjectGetListSync {
//   _id: string;
//   projectDesc: string;
//   projectName: string;
// }

export const typeEnum = {
  0: '转发',
  1: '聚合' 
}

export enum statusEnum {
  'offline' = '未上线',
  'online' = '已上线'
}

export interface InterfaceState {
  visible: boolean;
  id: string;
  type: 0 | 1;
  list: any[];
  proxyHeader: boolean;
  proxyPath: string;
}

// Define the initial state using that type
const initialState: InterfaceState = {
  visible: false,
  id: '',
  type: 0,
  proxyPath: '',
  proxyHeader: false,
  list: [],
};

// First, create the thunk
export const fetchInterface = createAsyncThunk(
  'project/fetchInterface',
  async (query?: string) => {
    const { code, data } = await request.get('/api/interface/list', { query });
    return code === 0 ? data : [];
  },
);

export const interfaceSlice = createSlice({
  name: 'interface',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state, action) => {
      state.visible = !state.visible;
      state.id = action.payload;
      return state;
    },
    changeType: (state, action) => {
      state.type = action.payload;
      return state;
    },
    formChange: (state, action) => {
      return Object.assign(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchInterface.fulfilled, (state, action) => {
      // Add user to the state array
      state.list = action.payload;
    });
  },
});

export const { change, changeType, formChange } = interfaceSlice.actions;

export default interfaceSlice.reducer;
