import api from '../lib/api';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    product_type: string;
    category_name: string;
    price: number;
    compare_price?: number;
    image?: string;
    is_featured: boolean;
    is_in_stock: boolean;
    stock_quantity: number;
    status: string;
}

export interface ProductDetail extends Product {
    category: {
        id: number;
        name: string;
        slug: string;
    };
    sku: string;
    weight?: number;
    origin?: string;
    roast_level?: string;
    flavor_notes?: string;
    caffeine_content?: string;
    images: Array<{
        id: number;
        image: string;
        alt_text: string;
        is_featured: boolean;
    }>;
    variants: Array<{
        id: number;
        name: string;
        price: number;
        stock_quantity: number;
    }>;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    is_active: boolean;
}

// Products API
export const productsApi = {
    // Get all products
    getAll: async (params?: {
        category?: string;
        search?: string;
        ordering?: string;
        page?: number;
    }) => {
        const response = await api.get<{ results: Product[]; count: number }>('/products/products/', { params });
        return response.data;
    },

    // Get single product by slug
    getBySlug: async (slug: string) => {
        const response = await api.get<ProductDetail>(`/products/products/${slug}/`);
        return response.data;
    },

    // Get featured products
    getFeatured: async () => {
        const response = await api.get<Product[]>('/products/products/featured/');
        return response.data;
    },

    // Get new arrivals
    getNewArrivals: async () => {
        const response = await api.get<Product[]>('/products/products/new_arrivals/');
        return response.data;
    },

    // Get products by category
    getByCategory: async (categorySlug: string) => {
        const response = await api.get<Product[]>('/products/products/by_category/', {
            params: { category: categorySlug }
        });
        return response.data;
    },

    // Create product (admin only)
    create: async (data: Partial<ProductDetail>) => {
        const response = await api.post<ProductDetail>('/products/products/', data);
        return response.data;
    },

    // Update product (admin only)
    update: async (slug: string, data: Partial<ProductDetail>) => {
        const response = await api.patch<ProductDetail>(`/products/products/${slug}/`, data);
        return response.data;
    },

    // Delete product (admin only)
    delete: async (slug: string) => {
        await api.delete(`/products/products/${slug}/`);
    },
};

// Categories API
export const categoriesApi = {
    // Get all categories
    getAll: async () => {
        const response = await api.get<Category[]>('/products/categories/');
        return response.data;
    },

    // Get single category
    getBySlug: async (slug: string) => {
        const response = await api.get<Category>(`/products/categories/${slug}/`);
        return response.data;
    },
};
