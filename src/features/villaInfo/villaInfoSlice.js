import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVillaInfo } from './villaInfoAPI';
import axios from "axios";


const initialState = {
  villaInfo: [],
  status: 'idle',
};

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

// fetching all villas 

export const fetchAsync = createAsyncThunk(
  'villaInfo/fetchVillaInfo',
  async () => {
    const response = await fetchVillaInfo();
    return response;
  }
);

// adding new villa api call 

export const addNewVilla = createAsyncThunk('villaInfo/addNewVilla', async ( formdata) => {
  try {
    const response = await axios.post('http://localhost:3000/villas/addvilla', formdata);
    return response.data; 
  } catch (error) {
    console.error('Error adding villa:', error);
    throw error;
  }
});

// deleting existing villa 

export const deleteVilla = createAsyncThunk('villaInfo/deleteVilla', async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/villas/deletevilla/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting villa:', error);
    throw error;
  }
});

// Updating a villa 

export const updateVilla = createAsyncThunk('villaInfo/updateVilla', async ({ id, updatedVilla }) => {
  try {
    const response = await axios.put(`http://localhost:3000/villas/updatevilla/${id}`, updatedVilla);
    return response.data; 
  } catch (error) {
    console.error('Error editing villa:', error);
    throw error;
  }
});

export default villaInfoSlice.reducer;


