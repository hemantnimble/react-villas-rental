import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVillaInfo } from './adminPanelAPI';

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

// export const {  } = villaInfoSlice.actions;

export default villaInfoSlice.reducer;


