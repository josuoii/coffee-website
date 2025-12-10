import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from './ToastContext';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'customer';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_ADMIN = {
    email: 'admin@kacip.com',
    password: 'admin123',
    user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@kacip.com',
        role: 'admin' as const,
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('kacip_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('kacip_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check credentials
        if (email === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
            setUser(DEMO_ADMIN.user);
            localStorage.setItem('kacip_user', JSON.stringify(DEMO_ADMIN.user));
            showToast(`Welcome back, ${DEMO_ADMIN.user.name}!`, 'success');
            setLoading(false);
            return true;
        }

        showToast('Invalid email or password', 'error');
        setLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('kacip_user');
        showToast('Logged out successfully', 'success');
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
