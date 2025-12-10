import api from '../lib/api';

export interface User {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone?: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    profile?: {
        bio: string;
        avatar?: string;
        address: string;
        city: string;
        postal_code: string;
        country: string;
        favorite_coffee: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

// Authentication API
export const authApi = {
    // Login
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login/', credentials);
        // Save token and user to localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    },

    // Register
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register/', data);
        // Save token and user to localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        try {
            await api.post('/auth/logout/');
        } finally {
            // Clear localStorage regardless of API response
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/auth/me/');
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    },

    // Change password
    changePassword: async (data: {
        old_password: string;
        new_password: string;
        new_password2: string;
    }): Promise<void> => {
        await api.post('/auth/change-password/', data);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

    // Get stored user
    getStoredUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },
};
