import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";

const Records = () => {

    const sugarRecords = [
        { date: "3-12-2025", before: "112mg/dl", after: "165mg/dl", status: "Stable", color: "text-green-500 bg-green-500/10" },
        { date: "3-12-2025", before: "137mg/dl", after: "173mg/dl", status: "Elevated", color: "text-yellow-500 bg-yellow-500/10" },
        { date: "3-12-2025", before: "62mg/dl", after: "124mg/dl", status: "Low", color: "text-red-500 bg-red-500/10" },
        { date: "3-12-2025", before: "120mg/dl", after: "155mg/dl", status: "Stable", color: "text-green-500 bg-green-500/10" },
        { date: "3-12-2025", before: "140mg/dl", after: "180mg/dl", status: "Elevated", color: "text-yellow-500 bg-yellow-500/10" },
    ];

    const foodLogs = [
        { food: "Rice Bowl", grams: 100, mode: "Maintenance", impact: "Moderate", time: "12:30 PM" },
        { food: "Banana", grams: 120, mode: "Maintenance", impact: "Comfortable", time: "09:00 AM" },
        { food: "Pizza Slice", grams: 150, mode: "Diabetes", impact: "High", time: "08:00 PM" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Health Records</h1>
                    <p className="text-slate-400">Track your history and monitor trends over time.</p>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded shadow-sm">Sugar Logs</button>
                    <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">Food History</button>
                </div>

            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Sugar Records Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800 rounded-3xl p-8 border border-slate-700/50 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-white flex items-center gap-2">
                            <div className="p-2 bg-brand-500/20 rounded-lg text-brand-500">
                                <FileText className="w-5 h-5" />
                            </div>
                            Sugar Record
                        </h3>
                        <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-300">Export CSV</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="border-b border-slate-700/50">
                                <tr>
                                    <th className="pb-4 font-medium pl-2">Date</th>
                                    <th className="pb-4 font-medium">Before</th>
                                    <th className="pb-4 font-medium">After</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {sugarRecords.map((record, index) => (
                                    <tr key={index} className="group hover:bg-slate-700/20 transition-colors">
                                        <td className="py-4 pl-2 font-medium text-white">{record.date}</td>
                                        <td className="py-4 font-mono">{record.before}</td>
                                        <td className="py-4 font-mono">{record.after}</td>
                                        <td className="py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${record.color}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Food Logs Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-dark-800 rounded-3xl p-8 border border-slate-700/50 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-white flex items-center gap-2">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
                                <FileText className="w-5 h-5" />
                            </div>
                            Recent Food Analysis
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {foodLogs.map((log, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-2xl border border-slate-700/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-12 rounded-full ${log.impact === 'Comfortable' ? 'bg-green-500' :
                                            log.impact === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}></div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{log.food}</h4>
                                        <p className="text-xs text-slate-500">{log.grams}g • {log.mode}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${log.impact === 'Comfortable' ? 'text-green-400' :
                                            log.impact === 'Moderate' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>{log.impact}</span>
                                    <span className="text-xs text-slate-600 block">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 border border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-brand-500 hover:bg-slate-700/30 transition-all font-medium text-sm flex items-center justify-center gap-2">
                        Load More History <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Records;
