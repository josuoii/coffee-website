import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { menuItems, getCategoryItems } from '@/data/menu';
import type { MenuCategory } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';

const categories: { id: MenuCategory; label: string }[] = [
    { id: 'coffee', label: 'Coffee' },
    { id: 'non-coffee', label: 'Non-Coffee' },
    { id: 'food', label: 'Food' },
    { id: 'dessert', label: 'Dessert' },
];

export function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const { addItem } = useCart();
    const { showToast } = useToast();

    // Debounce search input for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Memoized add to cart handler
    const handleAddToCart = useCallback((item: typeof menuItems[0]) => {
        addItem(item);
        showToast(`${item.name} added to cart!`);
    }, [addItem, showToast]);

    // Memoize filtered items - only recalculate when category or search changes
    const filteredItems = useMemo(() => {
        let items = selectedCategory === 'all' ? menuItems : getCategoryItems(selectedCategory);

        // Apply search filter if query exists
        if (debouncedSearch.trim()) {
            const lowerQuery = debouncedSearch.toLowerCase().trim();
            items = items.filter(item =>
                item.name.toLowerCase().includes(lowerQuery) ||
                item.description.toLowerCase().includes(lowerQuery)
            );
        }

        return items;
    }, [selectedCategory, debouncedSearch]);

    // Memoize category change handler
    const handleCategoryChange = useCallback((category: MenuCategory | 'all') => {
        setSelectedCategory(category);
    }, []);

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-coffee text-white py-16 md:py-24">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            Our Menu
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Explore our carefully crafted selection of specialty coffee and delicious treats
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b shadow-sm">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                            <Button
                                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                                onClick={() => handleCategoryChange('all')}
                                className={selectedCategory === 'all' ? 'bg-gradient-coffee' : ''}
                            >
                                All Items
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={selectedCategory === category.id ? 'bg-gradient-coffee' : ''}
                                >
                                    {category.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Items Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-16">
                            <Coffee className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-2xl font-display font-semibold mb-2">No items found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what you're looking for
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-muted-foreground">
                                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <Card className="h-full overflow-hidden hover-lift group">
                                            {/* Image Placeholder */}
                                            <div className="aspect-square bg-gradient-cream relative overflow-hidden">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Coffee className="w-24 h-24 text-coffee-medium/20 group-hover:scale-110 transition-transform duration-300" />
                                                </div>

                                                {/* Badges */}
                                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                    {item.isPopular && (
                                                        <span className="bg-coffee-gold text-coffee-dark px-3 py-1 rounded-full text-xs font-semibold">
                                                            Popular
                                                        </span>
                                                    )}
                                                    {item.isNew && (
                                                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                                            New
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Nutrition Info Badge */}
                                                {item.nutritionInfo && (
                                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                                        {item.nutritionInfo.calories} cal
                                                    </div>
                                                )}
                                            </div>

                                            <CardContent className="p-6">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Nutrition Info */}
                                                {item.nutritionInfo && item.nutritionInfo.caffeine && (
                                                    <div className="mb-4 text-xs text-muted-foreground">
                                                        <span className="font-medium">Caffeine:</span> {item.nutritionInfo.caffeine}mg
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-2xl font-bold text-primary">
                                                            RM {item.price.toFixed(2)}
                                                        </span>
                                                        {item.customizations && item.customizations.length > 0 && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                Customizable
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="bg-gradient-coffee hover:opacity-90"
                                                        onClick={() => handleAddToCart(item)}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-coffee-light/30 py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-2">Customization</h3>
                            <p className="text-sm text-muted-foreground">
                                Personalize your drink with milk alternatives, sweetness levels, and more
                            </p>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-2">Nutrition Info</h3>
                            <p className="text-sm text-muted-foreground">
                                All items include detailed nutritional information for your reference
                            </p>
                        </div>
                        <div>
                            <h3 className="font-display font-semibold text-lg mb-2">Quality Guarantee</h3>
                            <p className="text-sm text-muted-foreground">
                                We use only the finest ingredients to ensure the best taste and quality
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
