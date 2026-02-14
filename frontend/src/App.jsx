import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Recipes from "./pages/Recipes";
import Records from "./pages/Records";
import Layout from "./layout/Layout";

// Wrapper for AnimatePresence
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/analyzer" element={<Analyzer />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/records" element={<Records />} />
                </Route>

                <Route path="*" element={<div className="pt-32 text-center text-white">404 - Not Found</div>} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <div className="bg-dark-900 min-h-screen text-slate-100 font-sans selection:bg-brand-500/30 selection:text-brand-200">
                <AnimatedRoutes />
            </div>
        </BrowserRouter>
    );
};

export default App;
