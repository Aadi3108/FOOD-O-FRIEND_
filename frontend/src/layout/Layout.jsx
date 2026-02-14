import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
    const location = useLocation();

    // Pages without sidebar (Login/Landing if needed)
    if (location.pathname === '/') return <Outlet />;

    return (
        <div className="flex bg-dark-900 min-h-screen">
            {/* Sidebar */}
            <div className="w-64 fixed h-screen z-20">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 relative overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
