import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, Heart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="pt-24 min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
            {/* Dynamic Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className="max-w-4xl mx-auto"
            >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm">
                    <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">AI-Powered Nutrition</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                    Eat Smart. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                        Live Free.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    CarbCare analyzes your meals in real-time, helping you make safer choices whether you're managing diabetes or just eating healthy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/analyzer')}
                        className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center">
                            Start Analyzing <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                    </button>

                    <button
                        onClick={() => navigate('/learn-more')}
                        className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-full text-slate-300 font-medium transition-all backdrop-blur-md"
                    >
                        Learn More
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
                    <div className="p-6 glass-panel rounded-2xl hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                            <Activity className="text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Real-time Analysis</h3>
                        <p className="text-slate-400 text-sm">Instant carb calculations powered by RecipeDB tailored to your portion size.</p>
                    </div>

                    <div className="p-6 glass-panel rounded-2xl hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                            <ShieldCheck className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Personalized Limits</h3>
                        <p className="text-slate-400 text-sm">Smart thresholds for Diabetes, Pre-diabetes, and Weight Loss modes.</p>
                    </div>

                    <div className="p-6 glass-panel rounded-2xl hover:bg-white/5 transition-colors group">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                            <Heart className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Flavor Pairing</h3>
                        <p className="text-slate-400 text-sm">Discover healthier alternatives and flavor matches from FlavorDB.</p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Home;
