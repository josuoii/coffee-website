import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Search,
    Mail,
    Phone,
    Calendar,
    ShoppingBag,
    DollarSign,
    Award,
    Eye,
    UserCheck,
    UserX,
    TrendingUp,
    Filter,
    X,
} from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

// Types
interface Customer {
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

type CustomerStatus = 'active' | 'inactive';

// Demo Data
const demoCustomers: Customer[] = [
    {
        id: '1',
        name: 'Ahmad Ibrahim',
        email: 'ahmad.ibrahim@email.com',
        phone: '+60 12-345 6789',
        joinedDate: new Date('2024-01-15'),
        totalOrders: 45,
        totalSpent: 1250.50,
        rewardPoints: 450,
        status: 'active',
        lastOrderDate: new Date('2024-12-08'),
        favoriteItems: ['Kacip Latte', 'Espresso'],
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        email: 'siti.nur@email.com',
        phone: '+60 13-456 7890',
        joinedDate: new Date('2024-02-20'),
        totalOrders: 32,
        totalSpent: 890.25,
        rewardPoints: 320,
        status: 'active',
        lastOrderDate: new Date('2024-12-09'),
        favoriteItems: ['Cappuccino', 'Croissant'],
    },
    {
        id: '3',
        name: 'Muhammad Ali',
        email: 'muhammad.ali@email.com',
        phone: '+60 14-567 8901',
        joinedDate: new Date('2024-03-10'),
        totalOrders: 28,
        totalSpent: 675.00,
        rewardPoints: 280,
        status: 'active',
        lastOrderDate: new Date('2024-12-07'),
        favoriteItems: ['Americano'],
    },
    {
        id: '4',
        name: 'Fatimah Zahra',
        email: 'fatimah.z@email.com',
        phone: '+60 15-678 9012',
        joinedDate: new Date('2024-04-05'),
        totalOrders: 18,
        totalSpent: 425.75,
        rewardPoints: 180,
        status: 'active',
        lastOrderDate: new Date('2024-12-05'),
    },
    {
        id: '5',
        name: 'Hassan Abdullah',
        email: 'hassan.a@email.com',
        joinedDate: new Date('2024-05-12'),
        totalOrders: 12,
        totalSpent: 310.00,
        rewardPoints: 120,
        status: 'inactive',
        lastOrderDate: new Date('2024-11-20'),
    },
    {
        id: '6',
        name: 'Nurul Aina',
        email: 'nurul.aina@email.com',
        phone: '+60 17-890 1234',
        joinedDate: new Date('2024-06-18'),
        totalOrders: 25,
        totalSpent: 580.50,
        rewardPoints: 250,
        status: 'active',
        lastOrderDate: new Date('2024-12-10'),
        favoriteItems: ['Mocha', 'Chocolate Cake'],
    },
    {
        id: '7',
        name: 'Azman Razak',
        email: 'azman.r@email.com',
        phone: '+60 18-901 2345',
        joinedDate: new Date('2024-07-22'),
        totalOrders: 8,
        totalSpent: 195.00,
        rewardPoints: 80,
        status: 'inactive',
        lastOrderDate: new Date('2024-10-15'),
    },
    {
        id: '8',
        name: 'Zainab Mohd',
        email: 'zainab.m@email.com',
        phone: '+60 19-012 3456',
        joinedDate: new Date('2024-08-30'),
        totalOrders: 35,
        totalSpent: 920.75,
        rewardPoints: 350,
        status: 'active',
        lastOrderDate: new Date('2024-12-09'),
        favoriteItems: ['Latte', 'Matcha Latte'],
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(demoCustomers);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const { showToast } = useToast();

    // Memoized filtered customers
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const matchesSearch =
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [customers, searchQuery, statusFilter]);

    // Memoized statistics
    const stats = useMemo(() => {
        const totalCustomers = customers.length;
        const activeCustomers = customers.filter((c) => c.status === 'active').length;
        const newCustomersThisMonth = customers.filter((c) => {
            const joinedDate = new Date(c.joinedDate);
            const now = new Date();
            return (
                joinedDate.getMonth() === now.getMonth() &&
                joinedDate.getFullYear() === now.getFullYear()
            );
        }).length;
        const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

        return {
            totalCustomers,
            activeCustomers,
            newCustomersThisMonth,
            totalRevenue,
        };
    }, [customers]);

    // Memoized stat cards - Chocolate Theme
    const statCards = useMemo(
        () => [
            {
                label: 'Total Customers',
                value: stats.totalCustomers,
                icon: Users,
                color: 'from-[#6D4C41] to-[#5D4037]', // Milk chocolate to dark chocolate
                bg: 'bg-[#EFEBE9]', // Chocolate cream
                textColor: 'text-[#4E342E]', // Dark chocolate
            },
            {
                label: 'Active Customers',
                value: stats.activeCustomers,
                icon: UserCheck,
                color: 'from-[#8D6E63] to-[#6D4C41]', // Light chocolate to milk chocolate
                bg: 'bg-[#D7CCC8]', // Light chocolate cream
                textColor: 'text-[#5D4037]', // Medium dark chocolate
            },
            {
                label: 'New This Month',
                value: stats.newCustomersThisMonth,
                icon: TrendingUp,
                color: 'from-[#A1887F] to-[#8D6E63]', // Very light chocolate to light chocolate
                bg: 'bg-[#EFEBE9]', // Chocolate cream
                textColor: 'text-[#6D4C41]', // Milk chocolate
            },
            {
                label: 'Total Revenue',
                value: `RM ${stats.totalRevenue.toLocaleString('en-MY', { minimumFractionDigits: 2 })}`,
                icon: DollarSign,
                color: 'from-[#5D4037] to-[#3E2723]', // Dark chocolate to very dark chocolate
                bg: 'bg-[#D7CCC8]', // Light chocolate cream
                textColor: 'text-[#3E2723]', // Very dark chocolate
            },
        ],
        [stats]
    );

    const toggleCustomerStatus = (customerId: string) => {
        setCustomers(
            customers.map((customer) =>
                customer.id === customerId
                    ? {
                        ...customer,
                        status: customer.status === 'active' ? 'inactive' : 'active',
                    }
                    : customer
            )
        );
        showToast('Customer status updated', 'success');
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-MY', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: CustomerStatus) => {
        return status === 'active'
            ? { bg: 'bg-green-100', text: 'text-green-700' }
            : { bg: 'bg-gray-100', text: 'text-gray-700' };
    };

    return (
        <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-coffee-dark to-coffee-medium bg-clip-text text-transparent mb-2">
                    Customer Management
                </h1>
                <p className="text-gray-600 text-lg">
                    Manage and view all your customers in one place
                </p>
            </motion.div>

            {/* Statistics Cards */}
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
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value as CustomerStatus | 'all')
                            }
                            className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white appearance-none cursor-pointer min-w-[180px]"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="mt-4 text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredCustomers.length}</span> of{' '}
                    <span className="font-semibold">{customers.length}</span> customers
                </div>
            </motion.div>

            {/* Customers Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Joined Date
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Orders
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Total Spent
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Points
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer, index) => {
                                const statusColor = getStatusColor(customer.status);
                                return (
                                    <motion.tr
                                        key={customer.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ backgroundColor: '#fafafa' }}
                                        className="transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-[#6D4C41] to-[#5D4037] rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                                    {customer.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ID: {customer.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    {customer.email}
                                                </div>
                                                {customer.phone && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <Phone className="w-4 h-4 text-gray-400" />
                                                        {customer.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {formatDate(customer.joinedDate)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag className="w-4 h-4 text-[#6D4C41]" />
                                                <span className="font-semibold text-gray-900">
                                                    {customer.totalOrders}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-[#5D4037]" />
                                                <span className="font-semibold text-gray-900">
                                                    RM {customer.totalSpent.toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4 text-[#8D6E63]" />
                                                <span className="font-semibold text-[#6D4C41]">
                                                    {customer.rewardPoints}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor.bg} ${statusColor.text}`}
                                            >
                                                {customer.status.charAt(0).toUpperCase() +
                                                    customer.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSelectedCustomer(customer)}
                                                    className="p-2 text-[#6D4C41] hover:bg-[#EFEBE9] rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => toggleCustomerStatus(customer.id)}
                                                    className={`p-2 rounded-lg transition-colors ${customer.status === 'active'
                                                        ? 'text-[#3E2723] hover:bg-[#D7CCC8]'
                                                        : 'text-[#8D6E63] hover:bg-[#EFEBE9]'
                                                        }`}
                                                    title={
                                                        customer.status === 'active'
                                                            ? 'Deactivate'
                                                            : 'Activate'
                                                    }
                                                >
                                                    {customer.status === 'active' ? (
                                                        <UserX className="w-4 h-4" />
                                                    ) : (
                                                        <UserCheck className="w-4 h-4" />
                                                    )}
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredCustomers.length === 0 && (
                    <div className="py-16 text-center">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No customers found</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </motion.div>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedCustomer(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] text-white p-6 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
                                        {selectedCustomer.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {selectedCustomer.name}
                                        </h2>
                                        <p className="text-[#EFEBE9]">Customer ID: {selectedCustomer.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedCustomer(null)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Contact Information
                                </h3>
                                <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">{selectedCustomer.email}</span>
                                    </div>
                                    {selectedCustomer.phone && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-700">{selectedCustomer.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">
                                            Joined {formatDate(selectedCustomer.joinedDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Customer Statistics
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#EFEBE9] rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <ShoppingBag className="w-5 h-5 text-[#6D4C41]" />
                                            <span className="text-sm text-gray-600">Total Orders</span>
                                        </div>
                                        <p className="text-2xl font-bold text-[#6D4C41]">
                                            {selectedCustomer.totalOrders}
                                        </p>
                                    </div>
                                    <div className="bg-[#D7CCC8] rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign className="w-5 h-5 text-[#5D4037]" />
                                            <span className="text-sm text-gray-600">Total Spent</span>
                                        </div>
                                        <p className="text-2xl font-bold text-[#5D4037]">
                                            RM {selectedCustomer.totalSpent.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="bg-[#EFEBE9] rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="w-5 h-5 text-[#8D6E63]" />
                                            <span className="text-sm text-gray-600">Reward Points</span>
                                        </div>
                                        <p className="text-2xl font-bold text-[#8D6E63]">
                                            {selectedCustomer.rewardPoints}
                                        </p>
                                    </div>
                                    <div className="bg-[#D7CCC8] rounded-xl p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-5 h-5 text-[#6D4C41]" />
                                            <span className="text-sm text-gray-600">Last Order</span>
                                        </div>
                                        <p className="text-sm font-semibold text-[#6D4C41]">
                                            {selectedCustomer.lastOrderDate
                                                ? formatDate(selectedCustomer.lastOrderDate)
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Favorite Items */}
                            {selectedCustomer.favoriteItems && selectedCustomer.favoriteItems.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Favorite Items
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCustomer.favoriteItems.map((item, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gradient-to-r from-[#6D4C41] to-[#5D4037] text-white rounded-full text-sm font-medium shadow-md"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Status */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    Account Status
                                </h3>
                                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                                    <span className="text-gray-700">Current Status:</span>
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedCustomer.status).bg
                                            } ${getStatusColor(selectedCustomer.status).text}`}
                                    >
                                        {selectedCustomer.status.charAt(0).toUpperCase() +
                                            selectedCustomer.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
