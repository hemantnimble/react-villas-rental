import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './userAPI';
import axios from "axios";


const initialState = {
  // users: [],
  admin: null,
  loggedIn: null,
  status: 'idle',
  errorlogin: { type: null, message: null },
  successlogin: null,
  errorlogout: { type: null, message: null },
  successlogout: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.errorlogin = null;
    },
    clearLogoutError: (state) => {
      state.errorlogout = null;
    },
    clearLoginSuccess: state => {
      state.successlogin = null;
    },
    clearLogoutSuccess: state => {
      state.successlogout = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loginloading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'loginfulfilled';
        state.admin = action.payload; // 
        state.successlogin = 'Login successfully'; // Set success message on successful registration
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'loginrejected';
        state.errorlogin = action.payload;
      })
      .addCase(loggedIn.pending, (state) => {
        state.status = 'authloading';
      })
      .addCase(loggedIn.fulfilled, (state, action) => {
        state.status = 'authfulfilled';
        state.loggedIn = action.payload; // 
      })
      .addCase(loggedIn.rejected, (state) => {
        state.status = 'authrejected';
      })
      ///logout
      .addCase(logOut.pending, (state) => {
        state.status = 'logoutloading';
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.status = 'logoutfulfilled';
        state.loggedIn = false;
        state.successlogout = 'Logout successfully'; // Set success message on successful registration 
      })
      .addCase(logOut.rejected, (state) => {
        state.status = 'logoutrejected';
        state.errorlogout = action.payload;
      })
  },
});

// fetching all USERS 

// export const fetchUserAsync = createAsyncThunk(
//   'users/fetchUsers',
//   async () => {
//     const response = await fetchUser();
//     return response;
//   }
// );

export default userSlice.reducer;

// adding new user



// export const addNewUser = createAsyncThunk('users/addNewUser', async (values, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/users/adduser', values);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding user:', error);
//     if (error.response && error.response.data) {
//       return rejectWithValue({ type: 'email', message: error.response.data.error }); // Email exists error
//     } else if (error.response && error.response.data) {
//       return rejectWithValue({ type: 'phone', message: 'Phone number already exists' }); // Phone number exists error
//     } else {
//       return rejectWithValue({ type: 'unknown', message: 'An unknown error occurred' }); //  for unknown errors
//     }
//   }
// });


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

export const login = createAsyncThunk('users/login', async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:3000/users/login`, values,);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response && error.response.data) {
      return rejectWithValue({ type: 'email', message: error.response.data.error }); // Email exists error
    } else if (error.response && error.response.data) {
      return rejectWithValue({ type: 'phone', message: 'Phone number already exists' }); // Phone number exists error
    } else {
      return rejectWithValue({ type: 'unknown', message: 'An unknown error occurred' }); //  for unknown errors
    }
  }
});


//logged in auth

export const loggedIn = createAsyncThunk('users/loggedin', async () => {
  try {
    // Send the token in the Authorization header
    const response = await axios.get('http://localhost:3000/users/loggedin', {
      withCredentials: true, // Include credentials (cookies) in the request
      headers: {
        'Content-Type': 'application/json',
        // Other headers as needed
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Authenticating:', error);
  }
});

//Logout
export const logOut = createAsyncThunk('users/logout', async () => {
  try {
    // Make a POST request to the server's logout endpoint
    const response = await axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true });

    // Handle successful logout, e.g., redirect to login page
    console.log(response.data);
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Propagate the error for handling in the rejected case
  }

});

export const { clearLoginError, clearLogoutError,clearLoginSuccess,clearLogoutSuccess } = userSlice.actions;

