import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from './ToastContext';
import { authApi, type User as ApiUser } from '../services/auth';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'customer';
    isStaff: boolean;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Convert API user to our User interface
function convertApiUser(apiUser: ApiUser): User {
    return {
        id: apiUser.id,
        name: `${apiUser.first_name} ${apiUser.last_name}`.trim() || apiUser.username,
        email: apiUser.email,
        role: (apiUser.is_staff || apiUser.is_superuser) ? 'admin' : 'customer',
        isStaff: apiUser.is_staff || apiUser.is_superuser,
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            if (authApi.isAuthenticated()) {
                try {
                    const apiUser = await authApi.getCurrentUser();
                    setUser(convertApiUser(apiUser));
                } catch (error) {
                    // Token invalid, clear it
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);

        try {
            const response = await authApi.login({ email, password });
            const convertedUser = convertApiUser(response.user);
            setUser(convertedUser);
            showToast(`Welcome back, ${convertedUser.name}!`, 'success');
            setLoading(false);
            return true;
        } catch (error: any) {
            const errorMessage = error.response?.data?.error ||
                error.response?.data?.detail ||
                'Invalid email or password';
            showToast(errorMessage, 'error');
            setLoading(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            showToast('Logged out successfully', 'success');
        }
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

