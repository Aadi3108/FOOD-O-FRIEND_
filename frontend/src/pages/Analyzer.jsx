import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { analyzeFood } from '../services/api';

const Analyzer = () => {
    const [formData, setFormData] = useState({
        food: '',
        grams: 100,
        mode: 'normal'
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await analyzeFood(formData);
            setResult(data.data);
        } catch (err) {
            setError(err.message || 'Failed to analyze'); // Mock error handling
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Food Impact Analyser</h1>
                <p className="text-slate-400">Understand how your meals affect your diabetes and recovery goals.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Input + Result */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Input Card */}
                    <div className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-brand-500" />
                            Check Food Portion Impact
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500 text-sm font-bold">Food</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-dark-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block pl-14 p-4 placeholder-slate-600 font-medium"
                                            placeholder="Rice, Banana..."
                                            value={formData.food}
                                            onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500 text-sm font-bold">Size</span>
                                        </div>
                                        <select
                                            className="w-full bg-dark-900 border border-slate-700 text-white text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block pl-12 pr-10 p-4 appearance-none cursor-pointer font-medium"
                                            value={formData.grams}
                                            onChange={(e) => setFormData({ ...formData, grams: e.target.value })}
                                        >
                                            <option value="50">Small - 50g</option>
                                            <option value="100">Bowl - 100g</option>
                                            <option value="150">Large - 150g</option>
                                            <option value="200">Extra Large - 200g</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                            <ChevronDown className="w-4 h-4 text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-sm px-5 py-3.5 text-center transition-all shadow-lg shadow-blue-600/20"
                            >
                                {loading ? "Analyzing..." : "Check Carb Impact"}
                            </button>
                        </form>
                    </div>

                    {/* Result Card */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`rounded-3xl p-8 shadow-2xl border relative overflow-hidden ${result.decision === 'High' ? 'bg-gradient-to-br from-red-900 to-red-950 border-red-500/30' :
                                        result.decision === 'Moderate' ? 'bg-gradient-to-br from-blue-900 to-blue-950 border-blue-500/30' :
                                            'bg-gradient-to-br from-green-900 to-green-950 border-green-500/30'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1 block">Analysis Result</span>
                                        <h2 className="text-3xl font-bold text-white mb-2">{result.decision} Impact</h2>
                                        <p className="text-white/80 max-w-sm">
                                            This portion may have <strong className="text-white uppercase">{result.decision} impact</strong> for your sensitivity level. Consider these adjustments:
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                                        <Info className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    <button className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/30 transition-all group backdrop-blur-sm text-left">
                                        <span className="font-medium text-white group-hover:text-blue-200">Pair with protein-rich food</span>
                                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/30 transition-all group backdrop-blur-sm text-left">
                                        <span className="font-medium text-white group-hover:text-blue-200">Try slightly smaller portion</span>
                                        <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* Background Graphic */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: Widgets */}
                <div className="space-y-6">
                    <div className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-brand-500/20 rounded-lg text-brand-500">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Cook With What You Have</h3>
                                <p className="text-xs text-slate-500">Find recipes based on pantry.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected Ingredients</h4>
                            <div className="flex flex-wrap gap-2">
                                {['onion', 'tomato', 'paneer'].map((tag) => (
                                    <span key={tag} className="bg-dark-900 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                                        {tag}
                                        <button className="hover:text-red-400">×</button>
                                    </span>
                                ))}
                                <button className="border border-dashed border-slate-600 text-slate-500 px-3 py-1.5 rounded-lg text-xs hover:border-brand-500 hover:text-brand-500 transition-colors">
                                    + Add
                                </button>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                            <Search className="w-4 h-4" /> Find Suitable Recipes
                        </button>
                    </div>

                    <div className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                        <h3 className="font-bold text-white mb-4 text-sm">Quick Suggestions for Recovery:</h3>
                        <div className="space-y-4">
                            <SuggestionItem
                                title="Boiled Vegetable Soup"
                                subtitle="Easy to Digest • Low Impact"
                                image="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=200"
                            />
                            <SuggestionItem
                                title="Soft Lentil Khichdi"
                                subtitle="Nutrient Rich • Gentle"
                                image="https://images.unsplash.com/photo-1543362906-acfc955b216e?auto=format&fit=crop&q=80&w=200"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuggestionItem = ({ title, subtitle, image }) => (
    <div className="flex gap-3 items-center group cursor-pointer p-2 hover:bg-slate-800/50 rounded-xl transition-colors">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700 shrink-0">
            <img src={image} className="w-full h-full object-cover" alt="" />
        </div>
        <div>
            <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{title}</h4>
            <p className="text-xs text-green-400 font-medium">{subtitle}</p>
        </div>
    </div>
);

export default Analyzer;
