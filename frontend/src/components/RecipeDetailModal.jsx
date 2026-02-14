import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Flame, Users, Globe, Utensils, Zap, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';

const RecipeDetailModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    // Robust list formatter to handle strings, arrays, or nulls
    const formatList = (input) => {
        if (!input) return [];
        if (Array.isArray(input)) return input.map(item => String(item).trim());
        if (typeof input === 'string') {
            return input.split('||').map(s => s.trim().charAt(0).toUpperCase() + s.trim().slice(1));
        }
        return [];
    };

    const utensils = formatList(recipe.Utensils);
    const processes = formatList(recipe.Processes);
    const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : formatList(recipe.instructions);

    // Nutritional helpers with fallbacks
    // List of keys to check for each nutrient
    const nutrientMap = {
        calories: ['Calories', 'Energy (kcal)', 'energy', 'calories', 'Energy'],
        protein: ['Protein (g)', 'protein', 'Protein', 'proteins'],
        carbs: ['Carbohydrate, by difference (g)', 'carbohydrates', 'carbs', 'Carbohydrate', 'Carbs'],
        fat: ['Total lipid (fat) (g)', 'fat', 'lipids', 'Fat', 'Fats']
    };

    const getNutrient = (type) => {
        const targetKeys = nutrientMap[type].map(k => k.toLowerCase());

        // 1. Try exact matches first
        for (const key of nutrientMap[type]) {
            const val = recipe[key];
            if (val !== undefined && val !== null && val !== '') {
                const numericVal = parseFloat(String(val).replace(/[^\d.]/g, ''));
                if (!isNaN(numericVal)) return `${Math.round(numericVal * 10) / 10}${type === 'calories' ? '' : 'g'}`;
            }
        }

        // 2. Try fuzzy matches (case-insensitive)
        const allKeys = Object.keys(recipe);
        for (const key of allKeys) {
            const lowerKey = key.toLowerCase();
            if (targetKeys.some(tk => lowerKey.includes(tk))) {
                const val = recipe[key];
                if (val !== undefined && val !== null && val !== '') {
                    const numericVal = parseFloat(String(val).replace(/[^\d.]/g, ''));
                    if (!isNaN(numericVal)) return `${Math.round(numericVal * 10) / 10}${type === 'calories' ? '' : 'g'}`;
                }
            }
        }

        return 'N/A';
    };

    // Derive dietary tags if not explicitly provided
    const getDietaryStatus = () => {
        const title = (recipe.Recipe_title || recipe.title || "").toLowerCase();
        const categories = formatList(recipe.Dietary_characteristics || recipe.Categories || '').map(c => c.toLowerCase());

        // Meat & Animal Keywords (English + common Regional/French/Indian terms found in Global DB)
        const meatKeywords = [
            'mutton', 'chicken', 'beef', 'lamb', 'pork', 'fish', 'prawn', 'shrimp',
            'meat', 'egg', 'tuna', 'salmon', 'crab', 'seafood', 'bacon', 'ham',
            'turkey', 'duck', 'calamari', 'squid', 'anchovy', 'steak', 'veal',
            'mouton', 'poulet', 'boeuf', 'viande', 'pescado', 'camaron', 'lamb',
            'agneau', 'gosht', 'pig', 'salami', 'pepperoni'
        ];

        const hasMeatInTitle = meatKeywords.some(kw => title.includes(kw));
        const isNonVeg = hasMeatInTitle || categories.some(c => c.includes('non-veg') || c.includes('meat') || meatKeywords.some(kw => c.includes(kw)));

        const isVegan = !isNonVeg && categories.some(c => c.includes('vegan'));
        const isVeg = (categories.some(c => (c.includes('veg') && !c.includes('non')) || c.includes('dairy')) || !isNonVeg) && !isNonVeg;

        // Final statuses
        const finalVegan = (recipe.vegan === "1.0" || recipe.vegan === true || isVegan) && !isNonVeg;
        const finalPescetarian = (recipe.pescetarian === "1.0" || recipe.pescetarian === true || title.includes('fish') || title.includes('seafood')) && !title.includes('chicken') && !title.includes('mutton') && !title.includes('beef');
        const finalVegetarian = (recipe.lacto_vegetarian === "1.0" || recipe.vegetarian === true || isVeg) && !isNonVeg;

        return {
            vegan: finalVegan,
            pescetarian: finalPescetarian,
            vegetarian: finalVegetarian
        };
    };

    const dietary = getDietaryStatus();

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-dark-800 border border-slate-700 rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Content Scrollable Area */}
                <div className="overflow-y-auto custom-scrollbar p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-500/10 text-brand-500 text-[10px] font-bold uppercase tracking-wider mb-4 border border-brand-500/20">
                            {recipe.Region || recipe.Continent || "Global Cuisine"}
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-4 pr-12 leading-tight">
                            {recipe.Recipe_title || recipe.title || "Selected Recipe"}
                        </h2>
                        <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                            <span className="flex items-center gap-1.5"><Clock size={16} /> {recipe.total_time || recipe.cook_time || '20'} mins</span>
                            <span className="flex items-center gap-1.5"><Users size={16} /> Serves {recipe.servings || '2'}</span>
                            <span className="flex items-center gap-1.5"><Globe size={16} /> {recipe.Continent || 'World'}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Nutritional Stats */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Calories</span>
                                <span className="text-xl font-bold text-white flex items-center gap-2">
                                    <Flame size={16} className="text-orange-500" />
                                    {getNutrient('calories')}
                                </span>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Protein</span>
                                <span className="text-xl font-bold text-white flex items-center gap-2">
                                    <Zap size={16} className="text-blue-500" />
                                    {getNutrient('protein')}
                                </span>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Carbs</span>
                                <span className="text-xl font-bold text-white">
                                    {getNutrient('carbs')}
                                </span>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center">
                                <span className="text-slate-500 text-[10px] font-bold uppercase mb-1">Fat</span>
                                <span className="text-xl font-bold text-white">
                                    {getNutrient('fat')}
                                </span>
                            </div>
                        </div>

                        {/* Dietary Flags */}
                        <div className="bg-brand-500/5 border border-brand-500/10 rounded-2xl p-6">
                            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest border-b border-white/5 pb-2">Dietary</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'Vegan', val: dietary.vegan },
                                    { label: 'Pescetarian', val: dietary.pescetarian },
                                    { label: 'Vegetarian', val: dietary.vegetarian }
                                ].map(item => (
                                    <li key={item.label} className={`flex items-center gap-2 text-xs font-medium ${item.val ? 'text-green-400' : 'text-slate-600'}`}>
                                        <CheckCircle2 size={14} className={item.val ? 'opacity-100' : 'opacity-20'} />
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Cooking Instructions (The Focus) */}
                        <div className="pt-6 border-t border-white/10">
                            <h4 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <div className="p-2.5 bg-brand-500 text-white rounded-2xl shadow-lg shadow-brand-500/20">
                                    <Utensils size={20} />
                                </div>
                                Cooking Guide
                            </h4>

                            {instructions.length > 0 ? (
                                <div className="space-y-6">
                                    {instructions.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex gap-6 group"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-2xl bg-dark-700 border border-slate-700 text-brand-400 flex items-center justify-center text-sm font-black shadow-xl group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-300">
                                                    {idx + 1}
                                                </div>
                                                {idx !== instructions.length - 1 && (
                                                    <div className="w-0.5 h-full bg-slate-800 mt-2" />
                                                )}
                                            </div>
                                            <div className="pb-8 flex-1">
                                                <p className="text-slate-300 text-base leading-relaxed group-hover:text-white transition-colors">
                                                    {step}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 rounded-3xl bg-slate-800/50 border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 text-center">
                                    <div className="p-4 bg-slate-800 rounded-full mb-4">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    </div>
                                    <p className="text-sm font-medium">Looking for exact steps from the recipe vault...</p>
                                    <p className="text-xs opacity-60 mt-1">Check ingredients below while we fetch the guide.</p>
                                </div>
                            )}
                        </div>

                        {/* Tags and Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            {utensils.length > 0 && (
                                <div>
                                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Tools Needed</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {utensils.map(u => (
                                            <span key={u} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300">
                                                {u}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {processes.length > 0 && (
                                <div>
                                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Key Steps</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {processes.map(p => (
                                            <span key={p} className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/10 text-xs text-blue-300">
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-700 bg-white/5 flex justify-between items-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        Trusted Nutritional Advice
                    </p>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
                    >
                        Got it, Chef!
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default RecipeDetailModal;
