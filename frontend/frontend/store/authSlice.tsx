import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface ApiError {
    message?: string;
    errors?: { message: string }[];
}

export interface User {
    id: string | number;
    email: string;
    username?: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (loginData: unknown, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
                loginData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const errorMessage =
                error.response?.data?.errors?.[0]?.message ||
                error.response?.data?.message ||
                error.message ||
                'Login failed';
            return rejectWithValue(errorMessage);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: unknown, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
                userData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const errorMessage =
                error.response?.data?.errors?.[0]?.message ||
                error.response?.data?.message ||
                error.message ||
                'Registration failed';
            return rejectWithValue(errorMessage);
        }
    }
);
// authRouter.get("/logout", authController.logout);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
                { withCredentials: true }
            );
            
            return response.data;
        } catch (err) {
            const error = err as AxiosError<ApiError>;
            const errorMessage = error.response?.data?.message || 'Logout failed';
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.success = false;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;