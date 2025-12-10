import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Clock, Package } from 'lucide-react';
import type { OrderStatus } from '@/types';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: number;
    total: number;
    status: OrderStatus;
    orderType: 'pickup' | 'delivery' | 'dine-in';
    createdAt: Date;
}

// Demo data
const demoOrders: Order[] = [
    {
        id: '1',
        orderNumber: '#1001',
        customerName: 'Ahmad Abdullah',
        customerEmail: 'ahmad@example.com',
        items: 3,
        total: 45.50,
        status: 'pending',
        orderType: 'pickup',
        createdAt: new Date(),
    },
    {
        id: '2',
        orderNumber: '#1002',
        customerName: 'Siti Nurhaliza',
        customerEmail: 'siti@example.com',
        items: 2,
        total: 28.00,
        status: 'preparing',
        orderType: 'dine-in',
        createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
        id: '3',
        orderNumber: '#1003',
        customerName: 'Lee Wei Ming',
        customerEmail: 'lee@example.com',
        items: 5,
        total: 67.80,
        status: 'ready',
        orderType: 'delivery',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
        id: '4',
        orderNumber: '#1004',
        customerName: 'Raj Kumar',
        customerEmail: 'raj@example.com',
        items: 1,
        total: 15.00,
        status: 'completed',
        orderType: 'pickup',
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
    },
];

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>(demoOrders);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const statusColors: Record<OrderStatus, { bg: string; text: string; icon: any }> = {
        pending: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Clock },
        confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
        preparing: { bg: 'bg-purple-100', text: 'text-purple-700', icon: Package },
        ready: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
        completed: { bg: 'bg-gray-100', text: 'text-gray-700', icon: CheckCircle },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const orderStats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        preparing: orders.filter(o => o.status === 'preparing').length,
        ready: orders.filter(o => o.status === 'ready').length,
        completed: orders.filter(o => o.status === 'completed').length,
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders Management</h1>
                <p className="text-gray-600">Track and manage all customer orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-sm text-orange-700 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{orderStats.pending}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <p className="text-sm text-purple-700 mb-1">Preparing</p>
                    <p className="text-2xl font-bold text-purple-600">{orderStats.preparing}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="text-sm text-green-700 mb-1">Ready</p>
                    <p className="text-2xl font-bold text-green-600">{orderStats.ready}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-sm text-gray-700 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-gray-600">{orderStats.completed}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => {
                                const StatusIcon = statusColors[order.status].icon;
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-900">{order.items} items</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-900">RM {order.total.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium capitalize">
                                                {order.orderType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status].bg} ${statusColors[order.status].text}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleTimeString('en-MY', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                                        className="text-xs px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="confirmed">Confirmed</option>
                                                        <option value="preparing">Preparing</option>
                                                        <option value="ready">Ready</option>
                                                        <option value="completed">Completed</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Order Details {selectedOrder.orderNumber}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600">Customer</p>
                                <p className="font-semibold text-gray-900">{selectedOrder.customerName}</p>
                                <p className="text-sm text-gray-600">{selectedOrder.customerEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Order Type</p>
                                <p className="font-semibold text-gray-900 capitalize">{selectedOrder.orderType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-semibold text-gray-900 capitalize">{selectedOrder.status}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-2xl font-bold text-gray-900">RM {selectedOrder.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
