import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertOctagon, AlertTriangle } from "lucide-react";

const ResultCard = ({ result }) => {
    const cardRef = useRef(null);

    if (!result) return null;

    const { decision, color, message, nutrition, alternatives, flavorPairings } = result;

    const getIcon = () => {
        switch (decision) {
            case 'Comfortable': return <CheckCircle className="w-12 h-12 text-green-400" />;
            case 'Moderate': return <AlertTriangle className="w-12 h-12 text-yellow-400" />;
            case 'High': return <AlertOctagon className="w-12 h-12 text-red-400" />;
            default: return <CheckCircle className="w-12 h-12 text-gray-400" />;
        }
    };

    const getBgColor = () => {
        switch (decision) {
            case 'Comfortable': return 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30';
            case 'Moderate': return 'bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-yellow-500/30';
            case 'High': return 'bg-gradient-to-br from-red-900/40 to-rose-900/40 border-red-500/30';
            default: return 'bg-slate-800 border-slate-700';
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            ref={cardRef}
            className={`w-full max-w-md mx-auto mt-8 p-6 rounded-2xl glass-panel shadow-2xl border ${getBgColor()}`}
        >
            <div className="flex flex-col items-center text-center">
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 p-4 rounded-full bg-white/5 backdrop-blur-sm shadow-inner"
                >
                    {getIcon()}
                </motion.div>

                <h2 className="text-3xl font-bold mb-1 tracking-tight">{decision}</h2>
                <p className="text-slate-300 text-sm mb-6 max-w-xs">{message}</p>

                <div className="w-full grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col items-center">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Total</span>
                        <span className="text-xl font-mono font-bold">{nutrition.totalCarbs}g</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col items-center">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Per 100g</span>
                        {/* Assuming serving size roughly correlates or just displaying raw per serving */}
                        <span className="text-xl font-mono font-bold">~{((nutrition.carbsPerServing / nutrition.servingSizeInGrams) * 100).toFixed(1)}g</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col items-center">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Serving</span>
                        <span className="text-xl font-mono font-bold">{nutrition.servingSizeInGrams}g</span>
                    </div>
                </div>

                {/* Flavor Pairings / Alternatives */}
                {alternatives && alternatives.length > 0 && (
                    <div className="w-full text-left mb-4">
                        <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Alternatives</h3>
                        <div className="flex flex-wrap gap-2">
                            {alternatives.map((alt, idx) => (
                                <span key={idx} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
                                    {alt}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {flavorPairings && flavorPairings.length > 0 && (
                    <div className="w-full text-left">
                        <h3 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Flavor Pairings</h3>
                        <div className="flex flex-wrap gap-2">
                            {flavorPairings.map((flavor, idx) => (
                                <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                                    {flavor}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </motion.div>
    );
};

export default ResultCard;
