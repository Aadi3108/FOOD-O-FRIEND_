import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, TrendingUp, ArrowRight } from 'lucide-react';

const ComprehensiveCare = () => {
    const features = [
        {
            title: "Portion Analyzer",
            desc: "Snap a photo of your meal. Our AI analyzes portions and calculates carb impact instantly for your specific sensitivity level.",
            icon: <Camera className="text-blue-500" size={24} />,
            color: "blue"
        },
        {
            title: "Recovery Assistance",
            desc: "Personalized dietary suggestions based on your recovery stage. Avoid trigger foods and enjoy \"recovery-friendly\" recipes.",
            icon: <Heart className="text-orange-500" size={24} />,
            color: "orange"
        },
        {
            title: "Insight Trends",
            desc: "Visualize your progress over weeks and months. Understand how different foods affect your sugar records over time.",
            icon: <TrendingUp className="text-emerald-500" size={24} />,
            color: "emerald"
        }
    ];

    return (
        <section className="py-24 bg-dark-900/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold mb-6">Comprehensive Care</h2>
                    <p className="text-slate-400 leading-relaxed">
                        We've designed every feature to make your health management effortless, data-driven, and supportive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group p-8 rounded-[32px] bg-dark-800/40 border border-white/5 hover:border-brand-500/30 transition-all hover:translate-y-[-8px] relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-colors
                                ${feature.color === 'blue' ? 'bg-blue-500/10' : ''}
                                ${feature.color === 'orange' ? 'bg-orange-500/10' : ''}
                                ${feature.color === 'emerald' ? 'bg-emerald-500/10' : ''}
                            `}>
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-4 group-hover:text-brand-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                                {feature.desc}
                            </p>

                            <button className="flex items-center gap-2 text-brand-400 font-semibold group/btn">
                                Learn more <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComprehensiveCare;
