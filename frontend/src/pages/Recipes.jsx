import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame, Tag, Check, ArrowRight } from "lucide-react";

const Recipes = () => {

    const recipes = [
        {
            title: "Soft Khichdi",
            desc: "Go easy on spices, well-cooked rice and lentils. Rich in essential minerals and gentle on the stomach.",
            image: "https://images.unsplash.com/photo-1543362906-acfc955b216e?auto=format&fit=crop&q=80&w=600",
            time: "20m",
            calories: "180 kcal",
            tags: ["Easy To Digest", "Low Impact"]
        },
        {
            title: "Boiled Vegetable Soup",
            desc: "Mildly spiced with tender cooked vegetables. Perfect for hydration and micronutrient intake.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600",
            time: "15m",
            calories: "120 kcal",
            tags: ["Hydrating", "Vitamin Rich"]
        },
        {
            title: "Green Quinoa Bowl",
            desc: "Protein-packed quinoa with steamed greens and avocado for sustained energy.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
            time: "25m",
            calories: "320 kcal",
            tags: ["Low Glycemic", "High Protein"]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Recovery Assistance</h1>
                    <p className="text-slate-400 max-w-xl">Personalized meal suggestions and dietary guidelines tailored for your specific recovery phase and diabetic needs.</p>
                </div>
                <div className="hidden md:flex text-brand-500 font-bold items-center gap-1 cursor-pointer hover:text-brand-400 transition-colors">
                    See All Safe Options <ArrowRight className="w-5 h-5" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Recipe Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <h3 className="font-bold text-xl text-white mb-4">Recovery Friendly Recipe Ideas</h3>
                    <div><p className="text-sm text-slate-500 mb-6">Gentle meal suggestions for today's digestion</p></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recipes.map((recipe, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-dark-800 rounded-3xl overflow-hidden shadow-xl border border-slate-700/50 group hover:border-slate-600 transition-all"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                                        {recipe.tags.map(tag => (
                                            <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag === 'Easy To Digest' ? 'bg-green-500 text-white' :
                                                    tag === 'Low Impact' ? 'bg-blue-500 text-white' :
                                                        'bg-slate-700 text-white'
                                                }`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={recipe.title} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-500 transition-colors">{recipe.title}</h3>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{recipe.desc}</p>

                                    <div className="flex items-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-wider border-t border-slate-700/50 pt-4">
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.time}</span>
                                        <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> {recipe.calories}</span>
                                        <div className="ml-auto p-2 bg-brand-500/10 rounded-full text-brand-500">
                                            <Tag className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-8">

                    {/* Foods to Avoid */}
                    <div className="bg-brand-500/5 rounded-3xl p-8 border border-brand-500/10">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                            Foods to avoid while recovering
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Opt for clearer, milder broths and light proteins.
                            </li>
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Eat baked items instead of fried or oily snacks.
                            </li>
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Avoid overly spicy, creamy, or acidic dishes.
                            </li>
                        </ul>

                        <button className="mt-8 bg-red-500/20 text-red-300 font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors">
                            Hard to digest
                        </button>
                    </div>

                    {/* Streak Mini Widget */}
                    <div className="bg-gradient-to-br from-brand-600 to-orange-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>

                        <h4 className="text-white/80 font-medium text-sm mb-1 uppercase tracking-wide relative z-10">Recovery Streak</h4>
                        <div className="flex items-end gap-2 mb-4 relative z-10">
                            <span className="text-5xl font-bold">108</span>
                            <span className="text-white/60 mb-2 font-medium">/ 154 days</span>
                        </div>

                        <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden relative z-10">
                            <div className="bg-white h-full rounded-full w-[70%]"></div>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mt-4 text-white/80 relative z-10">Almost at your goal!</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Recipes;
