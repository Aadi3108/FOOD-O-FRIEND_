import React from 'react';

const Stats = () => {
    const stats = [
        { label: "Accuracy in Tracking", value: "98%" },
        { label: "Meals Analyzed", value: "1M+" },
        { label: "App Store Rating", value: "4.9/5" },
        { label: "Health Support", value: "24/7" }
    ];

    return (
        <section className="bg-brand-500 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">{stat.value}</h3>
                            <p className="text-brand-100/80 font-medium text-sm lg:text-base">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
