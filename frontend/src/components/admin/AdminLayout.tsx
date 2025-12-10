import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

export function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
