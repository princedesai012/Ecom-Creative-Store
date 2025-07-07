import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser,logoutUser,fetchCurrentUser } from '../api/auth.api';

// Async thunk for user login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue   }) => {
    try {
        const response = await loginUser(credentials);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);

// Async thunk for user logout
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await logoutUser();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);
// Async thunk for fetching current user profile
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, {
    rejectWithValue
}) => {
    try {
        const response = await fetchCurrentUser();
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}

);
// Initial state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;

