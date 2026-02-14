import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Features = () => {
    const checks = [
        "Curated by clinical nutritionists",
        "Filter by ingredient availability",
        "Automatic carb count tracking"
    ];

    const recipes = [
        {
            name: "Boiled Veggie Soup",
            tag: "EASY TO DIGEST",
            tagColor: "emerald",
            img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Soft Herb Khichdi",
            tag: "RECOVERY BEST",
            tagColor: "blue",
            img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Green Quinoa Bowl",
            tag: "LOW GLYCEMIC",
            tagColor: "emerald",
            img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Spicy Pizza",
            tag: "AVOID FOR NOW",
            tagColor: "red",
            img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80"
        }
    ];

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                        Eat what makes you <span className="text-brand-500">feel better.</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                        Recovery doesn't have to be bland. We provide a curated list of "Easy to Digest" and "Low Impact" recipes tailored to your current health metrics.
                    </p>

                    <div className="space-y-4 mb-10">
                        {checks.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-success-500 flex items-center justify-center text-white">
                                    <Check size={14} />
                                </div>
                                <span className="font-medium text-slate-200">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button className="px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all">
                        Explore Recipe Library
                    </button>
                </motion.div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-2 gap-4 relative">
                    {/* Decorative blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-500/5 blur-[80px] -z-10 rounded-full" />

                    {recipes.map((recipe, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-dark-800/40 border border-white/5 rounded-3xl p-3 shadow-xl group hover:border-white/10 transition-all"
                        >
                            <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative">
                                <img src={recipe.img} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                            </div>
                            <h4 className="font-bold text-sm mb-2">{recipe.name}</h4>
                            <div className={`inline-block px-2 py-1 rounded-lg text-[10px] font-bold tracking-wider
                                ${recipe.tagColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                                ${recipe.tagColor === 'blue' ? 'bg-blue-500/10 text-blue-500' : ''}
                                ${recipe.tagColor === 'red' ? 'bg-red-500/10 text-red-500' : ''}
                            `}>
                                {recipe.tag}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
