import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-brand-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                        Trusted by 50,000+ Users Globally
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
                        Smart Recovery. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
                            Better Health.
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
                        Manage your diabetes and recovery journey with AI-powered meal analysis, sugar tracking, and personalized recipe suggestions. Simple, modern, and effective.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/25 flex items-center gap-2"
                        >
                            Start Your Journey
                        </button>
                        <button className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all flex items-center gap-2 group">
                            <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                                <Play size={18} fill="currentColor" />
                            </span>
                            Watch Demo
                        </button>
                    </div>
                </motion.div>

                {/* Right Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative bg-dark-800/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl overflow-hidden">
                        {/* Header Mock */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold">Hello, Matthew</h3>
                                <p className="text-sm text-slate-400">Your recovery streak: 108 days</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-brand-600" />
                            </div>
                        </div>

                        {/* Stats Cards Mock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-medium text-slate-400">Total Carb</span>
                                    <div className="w-6 h-6 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-500 text-[10px]">C</div>
                                </div>
                                <div className="relative w-32 h-32 mx-auto">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="75" className="text-brand-500" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-white">45g</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between text-[11px] text-slate-500">
                                    <span>Goal: 156g</span>
                                    <span className="text-brand-400">111g left</span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-sm font-medium text-slate-400">Sugar Record</span>
                                    <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-500 text-[10px]">S</div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-slate-400">Before</span>
                                            <span className="text-white font-bold">112mg/dl</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-pink-500 w-[60%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs mb-2">
                                            <span className="text-slate-400">After</span>
                                            <span className="text-white font-bold">105mg/dl</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-500 w-[45%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute -top-4 -right-4 bg-brand-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                        #1 Best Service
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
