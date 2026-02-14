import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { getHistory } from '../services/api';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch history
        // For now, since the backend endpoint is a placeholder, we'll use mock data
        // compatible with the Log model structure
        const mockData = [
            { _id: '1', food: 'Banana', grams: 100, mode: 'normal', decision: 'Comfortable', timestamp: new Date().toISOString() },
            { _id: '2', food: 'Pizza', grams: 200, mode: 'weight-loss', decision: 'High', timestamp: new Date(Date.now() - 86400000).toISOString() },
            { _id: '3', food: 'Oats', grams: 50, mode: 'diabetes', decision: 'Comfortable', timestamp: new Date(Date.now() - 172800000).toISOString() },
        ];

        // Simulate API call
        setTimeout(() => {
            setHistory(mockData);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="pt-24 min-h-screen px-4 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-emerald-400" />
                    <span>Analysis History</span>
                </h1>

                {loading ? (
                    <div className="text-slate-400 text-center py-10">Loading history...</div>
                ) : (
                    <div className="grid gap-4">
                        {history.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-panel p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-lg">{item.food} <span className="text-slate-500 text-sm font-normal">({item.grams}g)</span></span>
                                    <span className="text-xs text-slate-400 uppercase tracking-wide">{new Date(item.timestamp).toLocaleDateString()} &bull; {item.mode}</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.decision === 'Comfortable' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                            item.decision === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                                'bg-red-500/20 text-red-300 border-red-500/30'
                                        }`}>
                                        {item.decision}
                                    </span>
                                    <ArrowRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default History;
