import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchVillaInfo } from './villaInfoAPI';
import axios from "axios";


const initialState = {
  villaInfo: [],
  singleVilla: null,
  status: 'idle',
};

export const villaInfoSlice = createSlice({
  name: 'villaInfo',
  initialState,
  reducers: {
    clearSingleVilla: (state) => {
      state.singleVilla = null;
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
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = 'rejected';
      })
      //fetch by id
      .addCase(fetchVillaById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVillaById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.singleVilla = action.payload;
      })
      .addCase(fetchVillaById.rejected, (state) => {
        state.status = 'rejected';
      })
      //ADD NEW VILLA
      .addCase(addNewVilla.pending, (state) => {
        state.status = 'addnewloading';
      })
      .addCase(addNewVilla.fulfilled, (state, action) => {
        state.status = 'addnewsuccess';
        state.villaInfo = action.payload;
      })
      .addCase(addNewVilla.rejected, (state) => {
        state.status = 'addnewrejected';
      })
      //DELETE VILLA
      .addCase(deleteVilla.pending, (state) => {
        state.status = 'deleteloading';
      })
      .addCase(deleteVilla.fulfilled, (state, action) => {
        state.status = 'deletesuccess';
        state.villaInfo = action.payload;
      })
      .addCase(deleteVilla.rejected, (state) => {
        state.status = 'deleterejected';
      })
      //UPDATE VILLA
      .addCase(updateVilla.pending, (state) => {
        state.status = 'updateloading';
      })
      .addCase(updateVilla.fulfilled, (state, action) => {
        state.status = 'updatesuccess';
        state.villaInfo = action.payload;
      })
      .addCase(updateVilla.rejected, (state) => {
        state.status = 'updaterejected';
      })
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

//get single villa info
export const fetchVillaById = createAsyncThunk('villaInfo/fetchVillaById', async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/villas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching single villa:', error);
    throw error;
  }
});

// adding new villa api call 

export const addNewVilla = createAsyncThunk('villaInfo/addNewVilla', async (formdata) => {
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

export const updateVilla = createAsyncThunk('villaInfo/updateVilla', async ({ id, formdata }) => {
  try {
    const response = await axios.put(`http://localhost:3000/villas/updatevilla/${id}`, formdata);
    return response.data;
  } catch (error) {
    console.error('Error editing villa:', error);
    throw error;
  }
});


export const singleVillaById = (state) => state.villaInfo.singleVilla;

export default villaInfoSlice.reducer;


export const { clearSingleVilla } = villaInfoSlice.actions;
