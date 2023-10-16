import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVillaInfo } from './villaInfoAPI';
import axios from "axios";


const initialState = {
  villaInfo: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'villaInfo/fetchVillaInfo',
  async () => {
    const response = await fetchVillaInfo();
    return response;
  }
);

export const addNewVilla = createAsyncThunk('villaInfo/addNewVilla', async (villaData) => {
  try {
    const response = await axios.post('http://localhost:3000/addvilla', villaData);
    return response.data; // You can return any data sent back by the server, if needed.
  } catch (error) {
    console.error('Error adding villa:', error);
    throw error;
  }
});


export const deleteVilla = createAsyncThunk('villaInfo/deleteVilla', async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/villas/${id}`);
    return response.data; // You can return any data sent back by the server, if needed.
  } catch (error) {
    console.error('Error deleting villa:', error);
    throw error;
  }
});

export const updateVilla = createAsyncThunk('villaInfo/updateVilla', async ({ id, updatedVilla }) => {
  try {
    const response = await axios.put(`http://localhost:3000/updatevilla/${id}`, updatedVilla);
    return response.data; // You can return any data sent back by the server, if needed.
  } catch (error) {
    console.error('Error editing villa:', error);
    throw error;
  }
});


export const villaInfoSlice = createSlice({
  name: 'villaInfo',
  initialState,
  reducers: {
    // addNewVilla: (state, action) => {
    //   state.villaInfo.push(action.payload);
    // },
    // deleteVilla: (state, action) => {
    //   state.villaInfo = state.villaInfo.filter((villa) => villa.id !== action.payload);

    // },
    // updateVilla: (state, action) => {
    //   state.villaInfo = state.villaInfo.map((elem) =>
    //     elem.id === action.payload.id ? action.payload : elem
    //   );
    // },
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

// export const { updateVilla } = villaInfoSlice.actions;


export default villaInfoSlice.reducer;


