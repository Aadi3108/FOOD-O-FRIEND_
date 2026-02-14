import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, CheckCircle, Info, ArrowRight, Zap, Activity } from 'lucide-react';
import { analyzeFood } from '../services/api';
import { getRecipesByCarbs } from '../services/recipeService';
import { getDiabeticSubstitute } from '../services/substitutionService';
import RecipeDetailModal from '../components/RecipeDetailModal';

const Analyzer = () => {
    const [formData, setFormData] = useState({
        food: '',
        grams: '',
        mode: 'normal'
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [alternatives, setAlternatives] = useState([]);
    const [substitutes, setSubstitutes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState('');
    const [giQuery, setGiQuery] = useState('');

    const giDatabase = {
        rice: 73, bread: 75, apple: 36, banana: 51, potato: 85, pasta: 49, milk: 32, sugar: 65, chicken: 0, paneer: 0, egg: 0, dal: 25, salad: 15
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        setAlternatives([]);
        setSubstitutes([]);

        try {
            const data = await analyzeFood(formData);
            if (data && data.success) {
                setResult(data.data);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.warn("Backend unavailable, using Smart Simulation:", err);
            const food = formData.food.toLowerCase().trim();
            const grams = parseInt(formData.grams) || 100;
            const gi = giDatabase[food] || 50;
            const carbsPer100g = { rice: 28, bread: 49, apple: 14, banana: 23, potato: 17, pasta: 25, sugar: 100, dal: 15, salad: 3, chicken: 0, paneer: 2, milk: 5 }[food] || 15;
            const totalCarbs = (carbsPer100g * grams) / 100;
            const gl = (gi * totalCarbs) / 100;

            let riskLevel = 'Moderate';
            let advice = 'Eat moderately ⚠️';
            let score = 75;

            if (gl > 20) { riskLevel = 'High'; advice = 'High risk ❌ Consider alternatives'; score = 0; }
            else if (gl < 10) { riskLevel = 'Low'; advice = 'Safe choice 👍'; score = 92; }

            setResult({
                food: formData.food,
                grams: formData.grams,
                mode: formData.mode,
                nutrition: {
                    carbsPerServing: carbsPer100g,
                    servingSizeInGrams: 100,
                    totalCarbs: parseFloat(totalCarbs.toFixed(1))
                },
                glycemicIndex: gi,
                glycemicLoad: parseFloat(gl.toFixed(2)),
                riskLevel: riskLevel,
                score: score,
                advice: advice
            });

            setError("Note: Live cloud analysis offline. Showing impact based on curated patterns.");
        } finally {
            try {
                const altData = await getRecipesByCarbs(0, 15, 3);
                if (altData && (altData.success || Array.isArray(altData))) {
                    setAlternatives(Array.isArray(altData) ? altData : altData.data || []);
                }
            } catch (altErr) {
                console.warn("Failed to fetch carb alternatives:", altErr);
            }

            try {
                const subData = await getDiabeticSubstitute(formData.food);
                if (subData && subData.length > 0) {
                    setSubstitutes(subData);
                }
            } catch (subErr) {
                console.warn("Failed to fetch ingredient substitutes:", subErr);
            }

            setLoading(false);
        }
    };



    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-6 border-b border-white/5 pb-6">
                <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Food Impact Analyser</h1>
                <p className="text-slate-400 text-sm font-medium tracking-wide italic">Understand how your meals affect your metabolic health.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Input Area */}
                    <div className="bg-dark-800 rounded-[24px] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-xs uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-xl">
                            <Search className="w-4 h-4 text-brand-500" />
                            Analyze Portion
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            {error && (
                                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 border ${error.includes("Note:") ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : "bg-red-500/10 border-red-500/20 text-red-500"}`}>
                                    <Info className="w-3.5 h-3.5 shrink-0" />
                                    <span className="font-bold tracking-tight">{error}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Ingredient Name</span>
                                    <input
                                        type="text"
                                        className="w-full bg-dark-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-3.5 placeholder-slate-600 font-bold transition-all shadow-inner"
                                        placeholder="e.g. White Rice"
                                        value={formData.food}
                                        onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Portion Size (Grams)</span>
                                    <input
                                        type="number"
                                        className="w-full bg-dark-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block p-3.5 placeholder-slate-600 font-bold transition-all shadow-inner"
                                        placeholder="150"
                                        value={formData.grams}
                                        onChange={(e) => setFormData({ ...formData, grams: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 text-base"
                            >
                                {loading ? "Decoding Molecules..." : "Analyze Carb Impact"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </button>
                        </form>
                    </div>

                    {/* Result Card */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`rounded-[24px] p-6 shadow-2xl border-2 relative overflow-hidden ${result.riskLevel === 'High' ? 'bg-gradient-to-br from-red-900 to-red-950 border-red-500/30' :
                                    result.riskLevel === 'Moderate' ? 'bg-gradient-to-br from-blue-900 to-blue-950 border-blue-500/30' :
                                        'bg-gradient-to-br from-green-900 to-green-950 border-green-500/30'
                                    }`}
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/5">
                                                GI: {result.glycemicIndex}
                                            </span>
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest font-sans">Portion: {result.grams}g</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-white uppercase">{result.riskLevel} IMPACT</h2>
                                        <p className="text-white/80 font-bold text-sm leading-snug max-w-sm">
                                            {result.advice}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1.5">
                                        <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                                            <Zap className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-[9px] font-black text-white/40 tracking-widest uppercase">Safety: {result.score}/100</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 mt-6">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1 block">Nutritional Payload</span>
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-white">Carbohydrates</span>
                                            <span className="text-xl font-black text-white tracking-tighter">{result.nutrition?.totalCarbs}g</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1 block">Metabolic Signal</span>
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-white">Glycemic Load</span>
                                            <span className="text-xl font-black text-brand-400 tracking-tighter">{result.glycemicLoad}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {alternatives.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-green-500/20 rounded-lg text-green-500"><CheckCircle size={14} /></div>
                                    Recommended Low-Carb Alternatives
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {alternatives.slice(0, 3).map((recipe, idx) => (
                                        <div key={idx} onClick={() => setSelectedRecipe(recipe)} className="bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-500/50 cursor-pointer transition-all group p-3">
                                            <div className="h-32 rounded-xl overflow-hidden mb-3 relative bg-slate-800">
                                                <img src={`https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-green-500 text-[9px] font-black text-white rounded-md">IDEAL</div>
                                            </div>
                                            <h4 className="font-bold text-white text-xs line-clamp-1 mb-1">{recipe.Recipe_title || recipe.name}</h4>
                                            <div className="flex justify-between items-center brightness-75">
                                                <span className="text-[9px] font-black text-brand-400 uppercase tracking-widest">{recipe.Region || 'Global'}</span>
                                                <ArrowRight size={10} className="text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Glycemic Load Reference Table */}
                    <div className="bg-dark-800 rounded-[24px] p-6 border border-white/5 shadow-2xl">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                            <Activity className="w-4 h-4 text-brand-500" />
                            GL Reference Scale
                        </h3>
                        <div className="overflow-hidden rounded-xl border border-white/5">
                            <table className="w-full text-left text-[10px]">
                                <thead className="bg-white/5 text-slate-500 uppercase tracking-wider font-black">
                                    <tr>
                                        <th className="px-3 py-2">GL Range</th>
                                        <th className="px-3 py-2">Risk</th>
                                        <th className="px-3 py-2 text-right">Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr className="bg-green-500/5">
                                        <td className="px-3 py-2.5 font-bold text-white">≤ 10</td>
                                        <td className="px-3 py-2.5 text-green-400 font-bold uppercase tracking-tighter">Low</td>
                                        <td className="px-3 py-2.5 text-right font-black text-white/50">90-100</td>
                                    </tr>
                                    <tr className="bg-blue-500/5">
                                        <td className="px-3 py-2.5 font-bold text-white">11 – 19</td>
                                        <td className="px-3 py-2.5 text-blue-400 font-bold uppercase tracking-tighter">Moderate</td>
                                        <td className="px-3 py-2.5 text-right font-black text-white/50">60-89</td>
                                    </tr>
                                    <tr className="bg-red-500/5">
                                        <td className="px-3 py-2.5 font-bold text-white">≥ 20</td>
                                        <td className="px-3 py-2.5 text-red-400 font-bold uppercase tracking-tighter">High</td>
                                        <td className="px-3 py-2.5 text-right font-black text-white/50">0-59</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-3 text-[9px] text-slate-500 italic leading-snug">
                            GL = (GI × Net Carbs) / 100. Lower values indicate smaller blood sugar impact.
                        </p>
                    </div>

                    {/* GI Reference Table */}
                    <div className="bg-dark-800 rounded-[24px] p-6 border border-white/5 shadow-2xl">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                            <Info className="w-4 h-4 text-brand-500" />
                            GI Quick Guide
                        </h3>
                        <div className="relative mb-4">
                            <input
                                type="text"
                                className="w-full bg-dark-900 border border-slate-700 text-white text-[10px] rounded-xl p-3 pl-10 focus:ring-brand-500 placeholder-slate-600 font-bold"
                                placeholder="Search Index..."
                                value={giQuery}
                                onChange={(e) => setGiQuery(e.target.value)}
                            />
                            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-3" />
                        </div>
                        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2 custom-scrollbar">
                            {Object.entries(giDatabase)
                                .filter(([name]) => !giQuery || name.toLowerCase().includes(giQuery.toLowerCase()))
                                .map(([name, gi]) => (
                                    <div key={name} className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5">
                                        <span className="text-[10px] font-bold text-slate-300 capitalize">{name}</span>
                                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${gi > 70 ? 'bg-red-500/20 text-red-400' : gi > 55 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {gi}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>


                </div>
            </div>

            <AnimatePresence>
                {selectedRecipe && <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Analyzer;
