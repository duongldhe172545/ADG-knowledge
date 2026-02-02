import { Outlet, NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Library,
    MessageSquare,
    Upload,
    Settings,
    Search,
    Bell
} from 'lucide-react'

const navItems = [
    { path: '/', label: 'Tổng quan', icon: LayoutDashboard },
    { path: '/library', label: 'Thư viện', icon: Library },
    { path: '/chat', label: 'Chat AI', icon: MessageSquare },
]

const departments = [
    { id: 'd2com', name: 'D2Com' },
    { id: 'b2b', name: 'B2B' },
    { id: 's2b2c', name: 'S2B2C' },
    { id: 'marcom', name: 'MARCOM' },
]

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Logo */}
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">ADG Admin</h1>
                            <p className="text-xs text-gray-500">Trung tâm Tri thức</p>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="p-4 space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-4">Menu chính</p>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link w-full ${isActive ? 'active' : ''}`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Departments */}
                <nav className="p-4 space-y-1 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-4">Phòng ban</p>
                    {departments.map((dept) => (
                        <button
                            key={dept.id}
                            className="sidebar-link w-full text-left"
                        >
                            <span className="w-5 h-5 rounded bg-gray-200" />
                            <span>{dept.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-4 border-t border-gray-100">
                    <button className="sidebar-link w-full text-left">
                        <Settings size={20} />
                        <span>Cài đặt</span>
                    </button>
                </div>

                {/* User */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-sm">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Nguyễn Văn A</p>
                            <p className="text-xs text-gray-500 truncate">admin@adg.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm trong kho tri thức..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-6">
                        <NavLink to="/upload" className="btn-primary flex items-center gap-2">
                            <Upload size={18} />
                            Tải lên
                        </NavLink>
                        <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
