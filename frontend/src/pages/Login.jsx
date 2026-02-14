import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, User, Lock, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, signup } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.username, formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
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
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500">
                            {isLogin ? 'Start managing your recovery and diabetes goals today.' : 'Join Food-O-Friend and take control of your metabolic health.'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-1"
                            >
                                <label className="block text-sm font-medium text-slate-400 mb-1 pl-1 text-left">Username</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-bold"
                                        placeholder="johndoe"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-400 mb-1 pl-1 text-left">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-bold"
                                    placeholder="matthew@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between mb-1 pl-1">
                                <label className="block text-sm font-medium text-slate-400">Password</label>
                                {isLogin && <button type="button" className="text-sm text-brand-500 hover:text-brand-400">Forgot?</button>}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-all font-bold"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center pl-1 py-1">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-700 rounded bg-gray-800" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500">
                                    Remember me for 30 days
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-black text-brand-500 hover:text-brand-400 transition-colors"
                        >
                            {isLogin ? 'Create an account' : 'Sign In instead'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
