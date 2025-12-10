import { createContext, useContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import type { MenuItem } from '@/types';

interface CartItem extends MenuItem {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kacip_cart';

/**
 * Load cart from localStorage
 */
const loadCartFromStorage = (): CartItem[] => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load cart from storage:', error);
    }
    return [];
};

/**
 * Save cart to localStorage
 */
const saveCartToStorage = (items: CartItem[]): void => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Failed to save cart to storage:', error);
    }
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        saveCartToStorage(items);
    }, [items]);

    // Memoized add item function for stable reference
    const addItem = useCallback((item: MenuItem) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

            if (existingItemIndex > -1) {
                // Update existing item quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1
                };
                return newItems;
            }

            // Add new item
            return [...prevItems, { ...item, quantity: 1 }];
        });
    }, []);

    // Memoized remove item function
    const removeItem = useCallback((itemId: string) => {
        setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
    }, []);

    // Memoized update quantity function
    const updateQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(itemId);
            return;
        }

        setItems((prevItems) => {
            const itemIndex = prevItems.findIndex((i) => i.id === itemId);

            if (itemIndex === -1) return prevItems;

            const newItems = [...prevItems];
            newItems[itemIndex] = { ...newItems[itemIndex], quantity };
            return newItems;
        });
    }, [removeItem]);

    // Memoized clear cart function
    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    // Memoized total items calculation
    const getTotalItems = useCallback(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    // Memoized total price calculation
    const getTotalPrice = useCallback(() => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [items]);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
    }), [items, addItem, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
