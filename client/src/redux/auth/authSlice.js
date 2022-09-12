import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../components/utils/axios';

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const getMe = createAsyncThunk('auth/getMe', async (_, ThunkAPI) => {
  try {
    const res = await axios.get('/auth/me');
    return res.data.data;
  } catch (err) {
    return ThunkAPI.rejectWithValue(err.response.data);
  }
});

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, ThunkAPI) => {
    try {
      const res = await axios.post('/auth/signup', userData);
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, ThunkAPI) => {
    try {
      const res = await axios.post('/auth/login', userData);
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, ThunkAPI) => {
  try {
    await axios.post('/auth/logout');
  } catch (err) {
    return ThunkAPI.rejectWithValue(err.response.data);
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, ThunkAPI) => {
    try {
      await axios.post('/auth/forgot-password', { email });
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, ThunkAPI) => {
    try {
      await axios.post(`auth/reset-password/${data.token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: {
    [getMe.pending]: state => {
      state.isLoading = true;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      const user = payload;
      state.error = null;
      state.isLoading = false;
      if (!user?._id) return;
      state.user = payload;
      state.isAuthenticated = true;
    },
    [getMe.rejected]: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = payload;
    },

    [signup.pending]: state => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.error = null;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [signup.rejected]: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = payload;
    },

    [login.pending]: state => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    [login.rejected]: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = payload;
    },

    [logout.pending]: state => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    },
    [logout.fulfilled]: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = payload;
    },

    [forgotPassword.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [forgotPassword.fulfilled]: state => {
      state.isLoading = false;
      state.error = null;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [resetPassword.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: state => {
      state.isLoading = false;
      state.error = null;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

// Export all the action
export const { clearError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
