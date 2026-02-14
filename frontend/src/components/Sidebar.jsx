import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, Activity, Settings, ClipboardList, Zap } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { name: "Analyzer", path: "/analyzer", icon: <Search className="w-5 h-5" /> },
        { name: "Smart Replacements", path: "/substitution", icon: <Zap className="w-5 h-5 text-brand-400" /> },
        { name: "Records", path: "/records", icon: <ClipboardList className="w-5 h-5" /> },
        { name: "Care", path: "/recipes", icon: <Heart className="w-5 h-5" /> },
        // { name: "Settings", path: "/settings", icon: <Settings className="w-5 h-5" /> },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900 border-r border-white/5 flex flex-col justify-between z-50">
            {/* Logo */}
            <div className="p-6">
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate('/')}
                >
                    <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:bg-brand-400 transition-colors">
                        <Activity className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            Food-O-Friend
                        </h1>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 mt-8 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={twMerge(
                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                            isActive(item.path)
                                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                                : "text-slate-400 hover:bg-slate-800 hover:text-brand-300"
                        )}
                    >
                        <span className={twMerge(
                            isActive(item.path) ? "text-white" : "text-slate-500 group-hover:text-brand-300 transition-colors"
                        )}>
                            {item.icon}
                        </span>
                        {item.name}
                    </button>
                ))}
            </nav>

            {/* User Profile Mini */}
            <div className="p-4 border-t border-white/5">
                <div
                    onClick={() => navigate('/profile')}
                    className={twMerge(
                        "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer group",
                        isActive('/profile') ? "bg-brand-500/10 border border-brand-500/20" : "hover:bg-slate-800"
                    )}
                >
                    <div className={twMerge(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border transition-all",
                        isActive('/profile') ? "bg-brand-500 border-white/20" : "bg-slate-700 border-slate-600 group-hover:bg-slate-600"
                    )}>
                        M
                    </div>
                    <div className="flex flex-col">
                        <span className={twMerge(
                            "text-sm font-medium transition-colors",
                            isActive('/profile') ? "text-brand-400" : "text-white"
                        )}>Matthew Jensen</span>
                        <span className="text-xs text-slate-500">Premium User</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
