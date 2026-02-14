import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ChefHat } from 'lucide-react';

const Suggestions = () => {
    const listRef = useRef(null);

    const categories = [
        {
            title: "Smart Alternatives",
            icon: <Sparkles className="w-5 h-5 text-purple-400" />,
            items: [
                { original: "White Rice", suggested: "Cauliflower Rice", benefit: "-90% Carbs" },
                { original: "Pasta", suggested: "Zucchini Noodles", benefit: "-85% Carbs" },
                { original: "Mashed Potato", suggested: "Mashed Cauliflower", benefit: "-80% Carbs" },
                { original: "Bread", suggested: "Portobello Mushroom", benefit: "-60% Carbs" }
            ],
            color: "from-purple-900/40 to-indigo-900/40 border-purple-500/30"
        },
        {
            title: "Flavor Pairings (FlavorDB)",
            icon: <ChefHat className="w-5 h-5 text-amber-400" />,
            items: [
                { original: "Chicken Breast", suggested: "Garlic + Lemon + Thyme", benefit: "Boosts Saturation" },
                { original: "Broccoli", suggested: "Soy Sauce + Sesame + Garlic", benefit: "Umami Kick" },
                { original: "Salmon", suggested: "Dill + Lemon + Fennel", benefit: "Fresh Profile" }
            ],
            color: "from-amber-900/40 to-orange-900/40 border-amber-500/30"
        },
        {
            title: "Quick Snacks",
            icon: <Utensils className="w-5 h-5 text-emerald-400" />,
            items: [
                { original: "Chips", suggested: "Cucumber Discs + Guacamole", benefit: "Healthy Fats" },
                { original: "Cookies", suggested: "Dark Chocolate + Berries", benefit: "Antioxidants" }
            ],
            color: "from-emerald-900/40 to-teal-900/40 border-emerald-500/30"
        }
    ];

    return (
        <div className="pt-24 min-h-screen px-4 max-w-5xl mx-auto pb-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        Smart Suggestions
                    </h1>
                    <p className="text-slate-400">Explore healthier alternatives and delicious pairings curated just for you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className={`glass-panel p-6 rounded-2xl border ${category.color} relative overflow-hidden group`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {category.icon}
                            </div>

                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                {category.icon}
                                {category.title}
                            </h2>

                            <div className="space-y-4">
                                {category.items.map((item, idy) => (
                                    <div key={idy} className="bg-white/5 p-3 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 line-through text-xs">{item.original}</span>
                                            <span className="text-white font-medium">{item.suggested}</span>
                                        </div>
                                        <div className="px-2 py-1 bg-white/10 rounded text-xs font-mono text-emerald-300 border border-white/5">
                                            {item.benefit}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default Suggestions;
