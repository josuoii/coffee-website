import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, ToggleRight, Package, Coffee, TrendingUp, X } from 'lucide-react';
import type { MenuItem, MenuCategory } from '@/types';
import { menuItems as initialMenuItems } from '@/data/menu';
import { useToast } from '@/contexts/ToastContext';

interface EditMenuModalProps {
    item: MenuItem | null;
    onClose: () => void;
    onSave: (item: MenuItem) => void;
}

function EditMenuModal({ item, onClose, onSave }: EditMenuModalProps) {
    const [formData, setFormData] = useState<MenuItem>(
        item || {
            id: '',
            name: '',
            description: '',
            price: 0,
            category: 'coffee' as MenuCategory,
            image: '',
            isPopular: false,
            isNew: false,
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-coffee-dark to-coffee-medium bg-clip-text text-transparent">
                        {item ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Item Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none"
                            placeholder="e.g., Caffe Latte"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none resize-none"
                            placeholder="Describe your menu item..."
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none"
                            placeholder="https://example.com/image.jpg (optional)"
                        />
                    </div>

                    {/* Price and Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (RM) *
                            </label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none"
                            >
                                <option value="coffee">Coffee</option>
                                <option value="non-coffee">Non-Coffee</option>
                                <option value="food">Food</option>
                                <option value="dessert">Dessert</option>
                                <option value="merchandise">Merchandise</option>
                            </select>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.isPopular}
                                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                className="w-5 h-5 rounded border-2 border-gray-300 text-amber-500 focus:ring-2 focus:ring-coffee-gold cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-coffee-dark transition-colors">
                                Mark as Popular Item
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={formData.isNew}
                                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                                className="w-5 h-5 rounded border-2 border-gray-300 text-green-500 focus:ring-2 focus:ring-coffee-gold cursor-pointer"
                            />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-coffee-dark transition-colors">
                                Mark as New Item
                            </span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] text-white rounded-xl hover:shadow-2xl transition-all font-semibold"
                        >
                            {item ? 'Save Changes' : 'Add Item'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}


export function AdminMenuPage() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const { showToast } = useToast();

    const categories: Array<{ value: MenuCategory | 'all'; label: string }> = [
        { value: 'all', label: 'All Items' },
        { value: 'coffee', label: 'Coffee' },
        { value: 'non-coffee', label: 'Non-Coffee' },
        { value: 'food', label: 'Food' },
        { value: 'dessert', label: 'Dessert' },
        { value: 'merchandise', label: 'Merchandise' },
    ];

    const filteredItems = menuItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setMenuItems(menuItems.filter(item => item.id !== id));
            showToast('Menu item deleted successfully', 'success');
        }
    };

    const handleToggleAvailability = (id: string) => {
        // In real app, this would update the backend
        showToast('Availability toggled successfully', 'success');
        console.log('Toggle availability for item:', id);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Chocolate Theme Stat Cards
    const statCards = [
        {
            label: 'Total Items',
            value: menuItems.length,
            color: 'from-[#6D4C41] to-[#5D4037]', // Milk chocolate
            textColor: 'text-[#4E342E]',
            bg: 'bg-[#EFEBE9]',
        },
        {
            label: 'Coffee Items',
            value: menuItems.filter(i => i.category === 'coffee').length,
            color: 'from-[#5D4037] to-[#3E2723]', // Dark chocolate
            textColor: 'text-[#3E2723]',
            bg: 'bg-[#D7CCC8]',
        },
        {
            label: 'Food Items',
            value: menuItems.filter(i => i.category === 'food').length,
            color: 'from-[#8D6E63] to-[#6D4C41]', // Light chocolate
            textColor: 'text-[#5D4037]',
            bg: 'bg-[#EFEBE9]',
        },
        {
            label: 'Popular Items',
            value: menuItems.filter(i => i.isPopular).length,
            color: 'from-[#A1887F] to-[#8D6E63]', // Very light chocolate
            textColor: 'text-[#6D4C41]',
            bg: 'bg-[#D7CCC8]',
        },
    ];

    return (
        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-coffee-dark to-coffee-medium bg-clip-text text-transparent mb-2">
                            Menu Management
                        </h1>
                        <p className="text-gray-600 text-lg">Manage your menu items, prices, and availability</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] text-white px-6 py-3 rounded-xl hover:shadow-2xl transition-all shadow-lg font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Item
                    </motion.button>
                </div>

                {/* Stats */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                >
                    {statCards.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            whileHover={{ y: -4, scale: 1.02 }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                        >
                            {/* Background decoration */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-12 -mt-12`} />

                            <div className="relative z-10">
                                <p className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</p>
                                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row gap-4"
                >
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none bg-white shadow-sm hover:shadow-md"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as MenuCategory | 'all')}
                        className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-coffee-gold focus:border-coffee-gold transition-all outline-none bg-white shadow-sm hover:shadow-md font-medium"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </motion.div>
            </motion.div>

            {/* Menu Items Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                    >
                        {/* Image */}
                        <div className="relative h-48 bg-gradient-to-br from-coffee-light to-coffee-medium/20 overflow-hidden group flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <Coffee className="w-24 h-24 text-coffee-medium/20" />
                            </div>
                            {item.isPopular && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="absolute top-3 left-3 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                                >
                                    Popular
                                </motion.span>
                            )}
                            {item.isNew && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.05 + 0.1 }}
                                    className="absolute top-3 right-3 bg-gradient-to-r from-[#8D6E63] to-[#6D4C41] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1"
                                >
                                    <TrendingUp className="w-3 h-3" />
                                    New
                                </motion.span>
                            )}
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-4 flex-grow">
                                <h3 className="font-bold text-xl text-gray-900 mb-2">{item.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="flex items-center justify-between mb-5">
                                <span className="text-2xl font-bold bg-gradient-to-r from-coffee-dark to-coffee-medium bg-clip-text text-transparent">
                                    RM {item.price.toFixed(2)}
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full font-semibold capitalize border border-gray-200">
                                    {item.category}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setEditingItem(item)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#EFEBE9] to-[#D7CCC8] text-[#4E342E] px-4 py-2.5 rounded-xl hover:from-[#D7CCC8] hover:to-[#BCAAA4] transition-all font-semibold shadow-sm"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleToggleAvailability(item.id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#EFEBE9] to-[#D7CCC8] text-[#5D4037] px-4 py-2.5 rounded-xl hover:from-[#D7CCC8] hover:to-[#BCAAA4] transition-all font-semibold shadow-sm"
                                    title="Toggle Stock Availability"
                                >
                                    <ToggleRight className="w-4 h-4" />
                                    <span className="hidden sm:inline">Stock</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(item.id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-50 to-red-100 text-red-600 px-4 py-2.5 rounded-xl hover:from-red-100 hover:to-red-200 transition-all font-semibold shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </motion.div>
            )}

            {/* Add/Edit Modal */}
            {(isAddModalOpen || editingItem) && (
                <EditMenuModal
                    item={editingItem}
                    onClose={() => {
                        setIsAddModalOpen(false);
                        setEditingItem(null);
                    }}
                    onSave={(updatedItem) => {
                        if (editingItem) {
                            // Update existing item
                            setMenuItems(menuItems.map(item =>
                                item.id === updatedItem.id ? updatedItem : item
                            ));
                            showToast('Menu item updated successfully', 'success');
                        } else {
                            // Add new item
                            setMenuItems([...menuItems, { ...updatedItem, id: Date.now().toString() }]);
                            showToast('Menu item added successfully', 'success');
                        }
                        setIsAddModalOpen(false);
                        setEditingItem(null);
                    }}
                />
            )}
        </div>
    );
}
