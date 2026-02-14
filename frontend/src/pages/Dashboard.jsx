import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Plus, FileText, Droplets, Utensils, Zap, Clock } from "lucide-react";

const Dashboard = () => {

    const sugarRecords = [
        { date: "3-12-2025", before: "112mg/dl", after: "165mg/dl", status: "Stable", color: "text-green-500 bg-green-500/10" },
        { date: "3-12-2025", before: "137mg/dl", after: "173mg/dl", status: "Elevated", color: "text-yellow-500 bg-yellow-500/10" },
        { date: "3-12-2025", before: "62mg/dl", after: "124mg/dl", status: "Low", color: "text-red-500 bg-red-500/10" },
    ];

    return (
        <div className="text-white py-6">

            {/* Header */}
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Hello, Matthew</h1>
                    <p className="text-slate-400">Ready for your recovery goals today?</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=fill&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-sm font-semibold text-white">Matthew Reed</span>
                            <span className="text-xs text-slate-500">Age: 28 • Type 2</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Total Carb Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl relative overflow-hidden flex flex-col items-center justify-center"
                >
                    <div className="absolute top-4 left-4 text-slate-400 text-sm font-medium">Total Carb</div>
                    <div className="absolute top-4 right-4 text-slate-400">•••</div>

                    <div className="relative w-40 h-40 my-6">
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
                                <span className="text-sm font-bold">110g</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sugar Record Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-1 md:col-span-2 bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            Sugar Record
                        </h3>
                        <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-300">View All History</button>
                    </div>

                    <div className="overflow-x-auto">
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
                                    <tr key={index} className="group hover:bg-slate-700/20 transition-colors">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl mb-8 flex items-center justify-between"
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
                        <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 italic">You're doing great! Keep going to reach your 154-day recovery milestone.</p>
                </div>
            </motion.div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Recovery Friendly Meals */}
                <div className="col-span-1 md:col-span-2 bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-bold text-white">Recovery Friendly Meals</h3>
                            <p className="text-xs text-slate-500">Gentle meal suggestions for easy digestion</p>
                        </div>
                        <span className="text-brand-500 text-sm font-medium cursor-pointer hover:underline flex items-center gap-1">See All <ArrowRight className="w-4 h-4" /></span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <MealCard
                            image="https://images.unsplash.com/photo-1543362906-acfc955b216e?auto=format&fit=crop&q=80&w=400"
                            title="Soft Khichdi"
                            desc="Go easy on spices, well-cooked rice & lentils."
                            tags={['Low Impact', 'Easy Digest']}
                        />
                        <MealCard
                            image="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400"
                            title="Boiled Vegetable Soup"
                            desc="Mildly spiced with tender cooked vegetables."
                            tags={['Hydrating', 'Vitamin Rich']}
                        />
                    </div>
                </div>

                {/* Right Widget: Cook with what you have */}
                <div className="col-span-1 bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-white mb-4">Cook With What You Have</h3>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 mb-4 min-h-[140px]">
                            <div className="flex flex-wrap gap-2">
                                <IngredientTag title="onion" />
                                <IngredientTag title="tomato" />
                                <IngredientTag title="paneer" />
                                <button className="px-3 py-1.5 rounded-lg border border-slate-600 border-dashed text-slate-500 text-xs hover:border-brand-500 hover:text-brand-500 flex items-center gap-1 transition-all">
                                    <Plus className="w-3 h-3" /> Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-500/20 transition-all">
                        Find Suitable Recipes
                    </button>
                </div>
            </div>
        </div>
    );
};

const ArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

const MealCard = ({ image, title, desc, tags }) => (
    <div className="group cursor-pointer">
        <div className="relative h-32 rounded-xl overflow-hidden mb-3">
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

const IngredientTag = ({ title }) => (
    <div className="group flex items-center gap-1 bg-slate-800 text-slate-300 px-2 pl-3 py-1.5 rounded-lg border border-slate-700 text-xs">
        {title}
        <button className="text-slate-500 hover:text-red-400"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
    </div>
);

export default Dashboard;
