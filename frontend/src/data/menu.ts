import type { MenuItem } from '@/types';

export const menuItems: MenuItem[] = [
    // Coffee Drinks
    {
        id: 'espresso',
        name: 'Classic Espresso',
        description: 'Rich and bold espresso shot, perfectly extracted',
        category: 'coffee',
        price: 3.50,
        image: '/images/espresso.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 5,
            protein: 0,
            carbs: 1,
            fat: 0,
            caffeine: 75,
        },
    },
    {
        id: 'latte',
        name: 'Caffe Latte',
        description: 'Smooth espresso with steamed milk and a light foam',
        category: 'coffee',
        price: 4.50,
        image: '/images/latte.jpg',
        isPopular: true,
        customizations: [
            {
                id: 'milk-type',
                name: 'Milk Type',
                required: true,
                options: [
                    { id: 'whole', name: 'Whole Milk', priceModifier: 0 },
                    { id: 'oat', name: 'Oat Milk', priceModifier: 0.50 },
                    { id: 'almond', name: 'Almond Milk', priceModifier: 0.50 },
                    { id: 'soy', name: 'Soy Milk', priceModifier: 0.50 },
                ],
            },
            {
                id: 'size',
                name: 'Size',
                required: true,
                options: [
                    { id: 'small', name: 'Small', priceModifier: 0 },
                    { id: 'medium', name: 'Medium', priceModifier: 0.75 },
                    { id: 'large', name: 'Large', priceModifier: 1.50 },
                ],
            },
        ],
        nutritionInfo: {
            calories: 150,
            protein: 8,
            carbs: 14,
            fat: 6,
            caffeine: 75,
        },
    },
    {
        id: 'cappuccino',
        name: 'Cappuccino',
        description: 'Equal parts espresso, steamed milk, and foam',
        category: 'coffee',
        price: 4.25,
        image: '/images/cappuccino.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 120,
            protein: 6,
            carbs: 12,
            fat: 4,
            caffeine: 75,
        },
    },
    {
        id: 'americano',
        name: 'Americano',
        description: 'Espresso diluted with hot water for a smooth finish',
        category: 'coffee',
        price: 3.75,
        image: '/images/americano.jpg',
        nutritionInfo: {
            calories: 10,
            protein: 0,
            carbs: 2,
            fat: 0,
            caffeine: 150,
        },
    },
    {
        id: 'mocha',
        name: 'Mocha',
        description: 'Rich chocolate and espresso with steamed milk',
        category: 'coffee',
        price: 5.25,
        image: '/images/mocha.jpg',
        isNew: true,
        nutritionInfo: {
            calories: 290,
            protein: 10,
            carbs: 35,
            fat: 12,
            caffeine: 95,
        },
    },
    {
        id: 'flat-white',
        name: 'Flat White',
        description: 'Velvety microfoam over a double shot of espresso',
        category: 'coffee',
        price: 4.75,
        image: '/images/flat-white.jpg',
        nutritionInfo: {
            calories: 130,
            protein: 7,
            carbs: 11,
            fat: 5,
            caffeine: 130,
        },
    },
    {
        id: 'cold-brew',
        name: 'Cold Brew',
        description: 'Smooth, slow-steeped coffee served over ice',
        category: 'coffee',
        price: 4.50,
        image: '/images/cold-brew.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 5,
            protein: 0,
            carbs: 1,
            fat: 0,
            caffeine: 200,
        },
    },

    // Non-Coffee Drinks
    {
        id: 'matcha-latte',
        name: 'Matcha Latte',
        description: 'Premium Japanese matcha with steamed milk',
        category: 'non-coffee',
        price: 5.50,
        image: '/images/matcha.jpg',
        isPopular: true,
        isNew: true,
        nutritionInfo: {
            calories: 190,
            protein: 8,
            carbs: 28,
            fat: 5,
            caffeine: 70,
        },
    },
    {
        id: 'chai-latte',
        name: 'Chai Latte',
        description: 'Spiced black tea with steamed milk and honey',
        category: 'non-coffee',
        price: 4.75,
        image: '/images/chai.jpg',
        nutritionInfo: {
            calories: 240,
            protein: 6,
            carbs: 42,
            fat: 5,
            caffeine: 50,
        },
    },
    {
        id: 'hot-chocolate',
        name: 'Hot Chocolate',
        description: 'Rich Belgian chocolate with steamed milk',
        category: 'non-coffee',
        price: 4.25,
        image: '/images/hot-chocolate.jpg',
        nutritionInfo: {
            calories: 320,
            protein: 12,
            carbs: 45,
            fat: 12,
            caffeine: 15,
        },
    },

    // Food Items
    {
        id: 'croissant',
        name: 'Butter Croissant',
        description: 'Flaky, buttery French pastry',
        category: 'food',
        price: 3.50,
        image: '/images/croissant.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 280,
            protein: 5,
            carbs: 32,
            fat: 15,
        },
    },
    {
        id: 'avocado-toast',
        name: 'Avocado Toast',
        description: 'Fresh avocado on artisan sourdough with cherry tomatoes',
        category: 'food',
        price: 7.50,
        image: '/images/avocado-toast.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 350,
            protein: 12,
            carbs: 38,
            fat: 18,
        },
    },
    {
        id: 'breakfast-sandwich',
        name: 'Breakfast Sandwich',
        description: 'Egg, cheese, and bacon on a toasted English muffin',
        category: 'food',
        price: 6.50,
        image: '/images/breakfast-sandwich.jpg',
        nutritionInfo: {
            calories: 420,
            protein: 22,
            carbs: 35,
            fat: 22,
        },
    },

    // Desserts
    {
        id: 'chocolate-cake',
        name: 'Chocolate Cake',
        description: 'Decadent triple chocolate layer cake',
        category: 'dessert',
        price: 5.50,
        image: '/images/chocolate-cake.jpg',
        nutritionInfo: {
            calories: 450,
            protein: 6,
            carbs: 58,
            fat: 24,
        },
    },
    {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        description: 'Classic creamy cheesecake with graham cracker crust',
        category: 'dessert',
        price: 6.00,
        image: '/images/cheesecake.jpg',
        isPopular: true,
        nutritionInfo: {
            calories: 410,
            protein: 8,
            carbs: 42,
            fat: 24,
        },
    },
];

// Cache for frequently accessed queries - improves performance
const queryCache = new Map<string, MenuItem[]>();

/**
 * Get items by category with caching for better performance
 * @param category - The category to filter by
 * @returns Filtered menu items
 */
export const getCategoryItems = (category: MenuItem['category']): MenuItem[] => {
    const cacheKey = `category_${category}`;

    if (queryCache.has(cacheKey)) {
        return queryCache.get(cacheKey)!;
    }

    const result = menuItems.filter(item => item.category === category);
    queryCache.set(cacheKey, result);
    return result;
};

/**
 * Get popular items with caching
 * @returns Popular menu items
 */
export const getPopularItems = (): MenuItem[] => {
    const cacheKey = 'popular_items';

    if (queryCache.has(cacheKey)) {
        return queryCache.get(cacheKey)!;
    }

    const result = menuItems.filter(item => item.isPopular === true);
    queryCache.set(cacheKey, result);
    return result;
};

/**
 * Get new items with caching
 * @returns New menu items
 */
export const getNewItems = (): MenuItem[] => {
    const cacheKey = 'new_items';

    if (queryCache.has(cacheKey)) {
        return queryCache.get(cacheKey)!;
    }

    const result = menuItems.filter(item => item.isNew === true);
    queryCache.set(cacheKey, result);
    return result;
};

/**
 * Get item by ID - uses find for O(n) complexity but with early exit
 * @param id - The item ID to search for
 * @returns Menu item or undefined
 */
export const getItemById = (id: string): MenuItem | undefined => {
    return menuItems.find(item => item.id === id);
};

/**
 * Clear query cache - useful when menu items are updated
 */
export const clearQueryCache = (): void => {
    queryCache.clear();
};

/**
 * Search items by query string - optimized for performance
 * @param query - Search query
 * @returns Matching menu items
 */
export const searchItems = (query: string): MenuItem[] => {
    if (!query || query.trim() === '') {
        return menuItems;
    }

    const lowerQuery = query.toLowerCase().trim();

    return menuItems.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
};
