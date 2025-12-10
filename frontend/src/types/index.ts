// Core types for the coffee shop application

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    category: MenuCategory;
    price: number;
    image: string;
    isPopular?: boolean;
    isNew?: boolean;
    customizations?: Customization[];
    nutritionInfo?: NutritionInfo;
}

export type MenuCategory =
    | 'coffee'
    | 'non-coffee'
    | 'food'
    | 'dessert'
    | 'merchandise';

export interface Customization {
    id: string;
    name: string;
    options: CustomizationOption[];
    required: boolean;
    maxSelections?: number;
}

export interface CustomizationOption {
    id: string;
    name: string;
    priceModifier: number;
}

export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    caffeine?: number;
}

export interface Store {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    hours: StoreHours;
    coordinates: {
        lat: number;
        lng: number;
    };
    features: StoreFeature[];
    image?: string;
}

export interface StoreHours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

export type StoreFeature =
    | 'wifi'
    | 'parking'
    | 'outdoor-seating'
    | 'drive-thru'
    | 'mobile-order'
    | 'delivery';

export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
    customizations: SelectedCustomization[];
    subtotal: number;
}

export interface SelectedCustomization {
    customizationId: string;
    optionIds: string[];
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    orderType: OrderType;
    pickupTime?: Date;
    deliveryAddress?: string;
    createdAt: Date;
}

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'completed'
    | 'cancelled';

export type OrderType =
    | 'pickup'
    | 'delivery'
    | 'dine-in';

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    rewardPoints: number;
    favoriteItems: string[];
    orders: Order[];
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    pointsRequired: number;
    image: string;
    category: 'drink' | 'food' | 'discount';
    expiryDate?: Date;
}

export interface Promotion {
    id: string;
    title: string;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    discountType: 'percentage' | 'fixed' | 'bogo';
    discountValue: number;
    applicableItems?: string[];
}

// Customer Types
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone?: string;
    joinedDate: Date;
    totalOrders: number;
    totalSpent: number;
    rewardPoints: number;
    status: 'active' | 'inactive';
    lastOrderDate?: Date;
    favoriteItems?: string[];
}

// Admin Types
export interface AdminStats {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalMenuItems: number;
    ordersToday: number;
    revenueToday: number;
    pendingOrders: number;
    completedOrders: number;
}


export interface AdminMenuItem extends MenuItem {
    stock: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminOrder extends Order {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    paymentMethod: 'cash' | 'card' | 'online';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    notes?: string;
}
