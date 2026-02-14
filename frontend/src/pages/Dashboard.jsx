import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Plus, FileText, Droplets, Utensils, Zap, Clock, ArrowRight, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();


    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };



    const sugarRecords = [
        { date: "3-12-2025", before: "112mg/dl", after: "165mg/dl", status: "Stable", color: "text-green-500 bg-green-500/10" },
        { date: "3-12-2025", before: "137mg/dl", after: "173mg/dl", status: "Elevated", color: "text-yellow-500 bg-yellow-500/10" },
        { date: "3-12-2025", before: "62mg/dl", after: "124mg/dl", status: "Low", color: "text-red-500 bg-red-500/10" },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-white py-6"
        >

            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <motion.div variants={itemVariants}>
                    <h1 className="text-3xl font-bold text-white mb-1">Hello, {user?.username || 'Guest'}</h1>
                    <p className="text-slate-400">Ready for your recovery goals today?</p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 cursor-pointer hover:bg-slate-700 transition-colors" onClick={() => navigate('/profile')}>
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center font-bold text-xs">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-semibold text-white">{user?.username || 'Guest User'}</span>
                            <span className="text-xs text-slate-500">Age: 19 • Type 2</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Total Carb Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl relative overflow-hidden flex flex-col items-center justify-center group hover:border-brand-500/30 transition-all cursor-pointer"
                    onClick={() => navigate('/records')}
                >
                    <div className="absolute top-4 left-4 text-slate-400 text-sm font-medium">Total Carb</div>
                    <div className="absolute top-4 right-4 text-slate-400">•••</div>

                    <div className="relative w-40 h-40 my-6 group-hover:scale-105 transition-transform duration-500">
                        {/* Simple CSS-based Circular Progress mock */}
                        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                            <path
                                className="text-slate-700"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className="text-brand-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                strokeDasharray="45, 100" // 45% filled
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-white">45g</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Consumed</span>
                        </div>
                    </div>

                    <div className="w-full flex justify-between mt-2 px-2">
                        <div className="flex items-center gap-3 bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-700">
                            <div className="p-1.5 bg-brand-500/20 rounded-lg text-brand-500">
                                <TrendingUp className="w-3 h-3" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase">Goal</span>
                                <span className="text-sm font-bold">150g</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-700">
                            <div className="p-1.5 bg-brand-500/20 rounded-lg text-brand-500">
                                <Clock className="w-3 h-3" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase">Left</span>
                                <span className="text-sm font-bold">105g</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sugar Record Table */}
                <motion.div
                    variants={itemVariants}
                    className="col-span-1 md:col-span-2 bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl flex flex-col"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            Summary & History
                        </h3>
                        <button
                            onClick={() => navigate('/records')}
                            className="text-xs bg-slate-700 hover:bg-brand-500 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-slate-300 flex items-center gap-1"
                        >
                            View All History <ArrowRight size={12} />
                        </button>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="border-b border-slate-700/50">
                                <tr>
                                    <th className="pb-3 font-medium pl-2">Date</th>
                                    <th className="pb-3 font-medium">Before eating</th>
                                    <th className="pb-3 font-medium">After eating</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {sugarRecords.map((record, index) => (
                                    <tr key={index} className="group hover:bg-slate-700/20 transition-colors cursor-pointer" onClick={() => navigate('/records')}>
                                        <td className="py-4 pl-2 font-medium text-white">{record.date}</td>
                                        <td className="py-4">{record.before}</td>
                                        <td className="py-4">{record.after}</td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${record.color}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Streak Section */}
            <motion.div
                variants={itemVariants}
                className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl mb-8 flex items-center justify-between cursor-pointer hover:border-brand-500/30 transition-colors"
                onClick={() => navigate('/profile')}
            >
                <div className="flex flex-col w-full">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="flex items-center gap-2 font-bold text-white">
                            <Zap className="w-5 h-5 text-brand-500 fill-brand-500" />
                            Recovery Streak
                        </h3>
                        <span className="text-slate-400 text-sm">108/154 days</span>
                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-brand-500 h-2.5 rounded-full"
                        ></motion.div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">You're doing great! Keep going to reach your 154-day recovery milestone.</p>
                </div>
            </motion.div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Recovery Friendly Meals */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-3 bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-bold text-white">Recovery Friendly Meals</h3>
                            <p className="text-xs text-slate-500">Gentle meal suggestions for easy digestion</p>
                        </div>
                        <span
                            onClick={() => navigate('/recipes')}
                            className="text-brand-500 text-sm font-medium cursor-pointer hover:underline flex items-center gap-1"
                        >
                            See All <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <MealCard
                            image="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=600"
                            title="Soft Khichdi"
                            desc="Go easy on spices, well-cooked rice & lentils."
                            tags={['Low Impact', 'Easy Digest']}
                            onClick={() => navigate('/recipes', { state: { query: 'Khichdi' } })}
                        />
                        <MealCard
                            image="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
                            title="Boiled Vegetable Soup"
                            desc="Mildly spiced with tender cooked vegetables."
                            tags={['Hydrating', 'Vitamin Rich']}
                            onClick={() => navigate('/recipes', { state: { query: 'Vegetable Soup' } })}
                        />
                    </div>
                </motion.div>


            </div>
        </motion.div>
    );
};

const MealCard = ({ image, title, desc, tags, onClick }) => (
    <div className="group cursor-pointer" onClick={onClick}>
        <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-800">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-2 left-2 flex gap-1">
                {tags.map((tag, i) => (
                    <span key={i} className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white border border-white/10">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        <h4 className="font-bold text-white mb-1 group-hover:text-brand-400 transition-colors">{title}</h4>
        <p className="text-xs text-slate-500 line-clamp-2">{desc}</p>
    </div>
);



export default Dashboard;
