import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVillaInfo } from './villaInfoAPI';

const initialState = {
  villaInfo: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'villaInfo/fetchVillaInfo',
  async () => {
    const response = await fetchVillaInfo();
    return response.data;
  }
);

export const villaInfoSlice = createSlice({
  name: 'villaInfo',
  initialState,
  reducers: {
    addNewVilla: (state, action) => {
      state.villaInfo.push(action.payload);
    },
    deleteVilla: (state, action) => {
      state.villaInfo = state.villaInfo.filter((villa) => villa.id !== action.payload);

    },
    updateVilla: (state, action) => {
      state.villaInfo = state.villaInfo.map((elem) =>
        elem.id === action.payload.id ? action.payload : elem
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.villaInfo = action.payload;
      });
  },
});

export const { addNewVilla, deleteVilla, updateVilla } = villaInfoSlice.actions;


export default villaInfoSlice.reducer;


