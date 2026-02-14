import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex text-center bg-dark-900 font-sans selection:bg-brand-500/20">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex flex-col justify-center items-start p-16 w-1/2 bg-gradient-to-br from-brand-900/40 via-dark-900 to-dark-800 border-r border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543362906-acfc955b216e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative z-10 text-left"
                >
                    <div className="bg-brand-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-brand-500/20">
                        <ShieldCheck className="w-8 h-8 text-brand-500" />
                    </div>
                    <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                        Empowering Your <br />
                        <span className="text-brand-500">Health Journey.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                        Track your carbs, monitor sugar levels, and receive personalized recovery assistance every step of the way.
                    </p>
                </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-dark-900">
                <div className="w-full max-w-md">
                    <div className="text-left mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Start managing your recovery and diabetes goals today.</p>
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-all text-slate-300 font-medium text-sm">
                            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">G</span>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-all text-slate-300 font-medium text-sm">
                            <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">f</span>
                            Facebook
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-dark-900 text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2 pl-1 text-left">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                                    placeholder="matthew@example.com"
                                    value="user@demo.com"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2 pl-1">
                                <label className="block text-sm font-medium text-slate-400">Password</label>
                                <a href="#" className="text-sm text-brand-500 hover:text-brand-400">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all"
                                value="password"
                                readOnly
                            />
                        </div>

                        <div className="flex items-center pl-1">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-700 rounded bg-gray-800" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500">
                                Remember me for 30 days
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <a href="#" className="font-medium text-brand-500 hover:text-brand-400">Create an account</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
