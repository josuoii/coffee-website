import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Coffee, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AdminStats } from '@/types';

// Move static data outside component to prevent recreation on every render
const POPULAR_ITEMS = ['Kacip Latte', 'Espresso', 'Cappuccino', 'Mocha', 'Americano'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats>({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalMenuItems: 0,
        ordersToday: 0,
        revenueToday: 0,
        pendingOrders: 0,
        completedOrders: 0,
    });

    // Simulate loading stats
    useEffect(() => {
        // In real app, fetch from API
        setStats({
            totalOrders: 1234,
            totalRevenue: 45678.90,
            totalCustomers: 567,
            totalMenuItems: 45,
            ordersToday: 23,
            revenueToday: 1234.50,
            pendingOrders: 5,
            completedOrders: 18,
        });
    }, []);

    // Memoize stat cards configuration - only recalculate when stats change
    // Chocolate Theme Stat Cards
    const statCards = useMemo(() => [
        {
            title: 'Total Revenue',
            value: `RM ${stats.totalRevenue.toLocaleString('en-MY', { minimumFractionDigits: 2 })}`,
            change: '+12.5%',
            trend: 'up' as const,
            icon: DollarSign,
            color: 'from-[#5D4037] to-[#3E2723]', // Dark chocolate
            bgLight: 'bg-[#D7CCC8]',
            textColor: 'text-[#3E2723]',
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders.toLocaleString(),
            change: '+8.2%',
            trend: 'up' as const,
            icon: ShoppingBag,
            color: 'from-[#6D4C41] to-[#5D4037]', // Milk chocolate
            bgLight: 'bg-[#EFEBE9]',
            textColor: 'text-[#4E342E]',
        },
        {
            title: 'Total Customers',
            value: stats.totalCustomers.toLocaleString(),
            change: '+15.3%',
            trend: 'up' as const,
            icon: Users,
            color: 'from-[#8D6E63] to-[#6D4C41]', // Light chocolate
            bgLight: 'bg-[#D7CCC8]',
            textColor: 'text-[#5D4037]',
        },
        {
            title: 'Menu Items',
            value: stats.totalMenuItems.toLocaleString(),
            change: '+3',
            trend: 'up' as const,
            icon: Coffee,
            color: 'from-[#A1887F] to-[#8D6E63]', // Very light chocolate
            bgLight: 'bg-[#EFEBE9]',
            textColor: 'text-[#6D4C41]',
        },
    ], [stats]);

    // Memoize today stats configuration - Chocolate Theme
    const todayStats = useMemo(() => [
        {
            label: 'Orders Today',
            value: stats.ordersToday,
            color: 'text-[#6D4C41]', // Milk chocolate
            bg: 'bg-[#EFEBE9]',
            icon: ShoppingBag,
        },
        {
            label: 'Revenue Today',
            value: `RM ${stats.revenueToday.toFixed(2)}`,
            color: 'text-[#5D4037]', // Dark chocolate
            bg: 'bg-[#D7CCC8]',
            icon: DollarSign,
        },
        {
            label: 'Pending Orders',
            value: stats.pendingOrders,
            color: 'text-[#8D6E63]', // Light chocolate
            bg: 'bg-[#EFEBE9]',
            icon: Clock,
        },
        {
            label: 'Completed Orders',
            value: stats.completedOrders,
            color: 'text-[#4E342E]', // Very dark chocolate
            bg: 'bg-[#D7CCC8]',
            icon: CheckCircle,
        },
    ], [stats]);

    return (
        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-coffee-dark to-coffee-medium bg-clip-text text-transparent mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600 text-lg">Welcome back! Here's what's happening today.</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                {statCards.map((stat) => (
                    <motion.div
                        key={stat.title}
                        variants={itemVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                    >
                        {/* Background decoration */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full -mr-16 -mt-16`} />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Today's Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Today's Overview</h2>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {todayStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={`${stat.bg} rounded-xl p-5 border-2 border-transparent hover:border-gray-200 transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                            </div>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                        <Link
                            to="/admin/orders"
                            className="text-sm text-coffee-medium hover:text-coffee-dark font-semibold flex items-center gap-1 transition-colors"
                        >
                            View All
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                                whileHover={{ x: 4 }}
                                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-coffee-gold/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#6D4C41] to-[#5D4037] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                        #{i}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Order #{1000 + i}</p>
                                        <p className="text-sm text-gray-600">Customer {i}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 mb-1">RM {(Math.random() * 50 + 10).toFixed(2)}</p>
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${i % 3 === 0 ? 'bg-[#D7CCC8] text-[#3E2723]' :
                                        i % 3 === 1 ? 'bg-[#EFEBE9] text-[#6D4C41]' :
                                            'bg-[#D7CCC8] text-[#5D4037]'
                                        }`}>
                                        {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Preparing'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Items */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Popular Items</h2>
                        <Link
                            to="/admin/menu"
                            className="text-sm text-coffee-medium hover:text-coffee-dark font-semibold flex items-center gap-1 transition-colors"
                        >
                            View Menu
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {POPULAR_ITEMS.map((item, i) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.05 }}
                                whileHover={{ x: -4 }}
                                className="flex items-center justify-between p-4 bg-gradient-to-l from-gray-50 to-white rounded-xl border border-gray-100 hover:border-coffee-gold/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#8D6E63] to-[#6D4C41] rounded-xl flex items-center justify-center shadow-lg">
                                        <Coffee className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{item}</p>
                                        <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50 + 20)} orders</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${100 - i * 15}%` }}
                                            transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                            className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500">{100 - i * 15}%</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
