import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Info, ArrowRight, ChevronRight, Droplets, Sparkles } from 'lucide-react';
import { getDiabeticSubstitute } from '../services/substitutionService';

const Substitution = () => {
    const [ingredient, setIngredient] = useState('');
    const [loading, setLoading] = useState(false);
    const [substitutes, setSubstitutes] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!ingredient.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const data = await getDiabeticSubstitute(ingredient);
            setSubstitutes(data);
        } catch (error) {
            console.error("Search failed:", error);
            setSubstitutes([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-500 rounded-xl shadow-lg shadow-brand-500/20">
                        <Zap className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Smart Replacements</h1>
                </div>
                <p className="text-slate-400 font-medium">Find diabetic-friendly, flavor-similar alternatives for any ingredient.</p>
            </header>

            {/* Search Section */}
            <div className="bg-dark-800 rounded-3xl p-8 border border-white/5 shadow-2xl mb-12 relative overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-brand-500/10"></div>

                <form onSubmit={handleSearch} className="relative z-10">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-dark-900 border border-slate-700 text-white rounded-2xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block pl-12 p-5 placeholder-slate-600 font-bold transition-all shadow-inner"
                                placeholder="Enter ingredient (e.g., Sugar, Rice, Flour...)"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !ingredient.trim()}
                            className="bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black px-10 py-5 rounded-2xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            {loading ? "Analyzing Molecules..." : "Find Alternatives"}
                            <Sparkles size={18} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Results Section */}
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <div className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Consulting FlavorDB...</p>
                    </motion.div>
                ) : searched ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {substitutes.length > 0 ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        Best Matches for <span className="text-brand-400 capitalize underline decoration-brand-500/30 underline-offset-4">{ingredient}</span>
                                    </h2>
                                    <span className="text-xs font-black text-slate-500 tracking-widest uppercase">
                                        {substitutes.length} Safe Options Found
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {substitutes.map((sub, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            className="bg-dark-800 p-6 rounded-3xl border border-white/5 hover:border-brand-500/30 transition-all shadow-xl group cursor-default relative overflow-hidden"
                                        >
                                            {/* Accent Gradient */}
                                            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-2xl font-black text-white group-hover:text-brand-400 transition-colors uppercase tracking-tight">
                                                            {sub.name}
                                                        </h3>
                                                        <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-500/20">
                                                            SAFE
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Carbs / 100g</span>
                                                            <span className="text-lg font-bold text-white">{sub.carbs}g</span>
                                                        </div>
                                                        <div className="w-px h-8 bg-white/5 mx-2"></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Flavor Match</span>
                                                            <span className="text-lg font-bold text-blue-400">{sub.flavorMatch}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-dark-900 rounded-2xl border border-white/5 shadow-inner">
                                                    <Droplets className="w-5 h-5 text-brand-500" />
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
                                                <span className="text-xs font-bold text-slate-400 italic">
                                                    Best for: Baking, Sweetening
                                                </span>
                                                <button className="text-brand-500 hover:text-brand-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 group/btn">
                                                    View Usage <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 bg-dark-800 rounded-3xl border border-dashed border-white/10">
                                <Info className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No Safe Substitutes Found</h3>
                                <p className="text-slate-500 mx-auto max-w-sm">We couldn't find a low-carb alternative for "{ingredient}" in our current database.</p>
                                <button
                                    onClick={() => setSearched(false)}
                                    className="mt-6 text-brand-500 font-black text-sm uppercase tracking-widest"
                                >
                                    Try Another Ingredient
                                </button>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Empty State / Tips */}
                        <div className="bg-dark-800/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
                                <Info className="text-blue-500" />
                            </div>
                            <h4 className="font-bold text-white mb-2 underline decoration-blue-500/50 underline-offset-4">Diabetic Approved</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">All suggestions are curated to be under 25g of carbs per typical serving.</p>
                        </div>
                        <div className="bg-dark-800/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center mb-4">
                                <Zap className="text-brand-500" />
                            </div>
                            <h4 className="font-bold text-white mb-2 underline decoration-brand-500/50 underline-offset-4">Flavor Science</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">We match the molecular flavor profile of ingredients to ensure taste consistency.</p>
                        </div>
                        <div className="bg-dark-800/50 p-6 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4">
                                <Droplets className="text-purple-500" />
                            </div>
                            <h4 className="font-bold text-white mb-2 underline decoration-purple-500/50 underline-offset-4">Proportions</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Get internal tips on how to adjust usage ratios for each specific replacement.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Substitution;
