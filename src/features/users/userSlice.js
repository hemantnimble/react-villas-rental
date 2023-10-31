import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './userAPI';
import axios from "axios";


const initialState = {
  users: [],
  status: 'idle',
  error: { type: null, message: null },
  success: null, 
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: state => {
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      // .addCase(fetchUserAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.users = action.payload;
      // })
      .addCase(addNewUser.fulfilled, (state) => {
        state.status = 'idle';
        state.success = 'User registered successfully'; // Set success message on successful registration
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

// fetching all USERS 

export const fetchUserAsync = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUser();
    return response;
  }
);

export default userSlice.reducer;

// adding new user

export const { clearError } = userSlice.actions;


export const addNewUser = createAsyncThunk('users/addNewUser', async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/users/adduser', values);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    if (error.response && error.response.data) {
      return rejectWithValue({ type: 'email', message: error.response.data.error }); // Email exists error
    } else if (error.response && error.response.data) {
      return rejectWithValue({ type: 'phone', message: 'Phone number already exists' }); // Phone number exists error
    } else {
      return rejectWithValue({ type: 'unknown', message: 'An unknown error occurred' }); //  for unknown errors
    }
  }
});


// export const addNewUser = createAsyncThunk('users/addNewUser', async (values) => {
//   try {
//     const response = await axios.post('http://localhost:3000/users/adduser', values);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding user:', error);
//     throw error;
//   }
// });

//login 

export const login = createAsyncThunk('users/login', async () => {
  try {
    const response = await axios.post(`http://localhost:3000/users/login`);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
});

// Updating a villa 

// export const updateVilla = createAsyncThunk('villaInfo/updateVilla', async ({ id, updatedVilla }) => {
//   try {
//     const response = await axios.put(`http://localhost:3000/villas/updatevilla/${id}`, updatedVilla);
//     return response.data; 
//   } catch (error) {
//     console.error('Error editing villa:', error);
//     throw error;
//   }
// });



