import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Phone, MapPin,
    TrendingDown, TrendingUp, Calendar,
    Award, Shield, Bell, ChevronRight,
    Droplets, Activity, Zap, Info
} from 'lucide-react';

const Profile = () => {
    const [user, setUser] = useState({
        name: "Matthew Jensen",
        email: "matthew.j@health.com",
        phone: "+1 (555) 000-1234",
        location: "New York, USA",
        avatar: "M",
        status: "Recovery Phase 2",
        memberSince: "Dec 2025"
    });

    const [settings, setSettings] = useState({
        healthAlerts: true,
        dailyReminders: false
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const metrics = [
        { label: "Daily Avg Carbs", value: "32g", goal: "45g", status: "below", icon: <Zap className="w-5 h-5" color="#3B82F6" />, trend: "Stable" },
        { label: "Latest HbA1c", value: "6.2%", goal: "7.0%", status: "safe", icon: <Droplets className="w-5 h-5" color="#10B981" />, trend: "-0.4%" },
        { label: "Recovery Streak", value: "108", goal: "154", status: "progress", icon: <Activity className="w-5 h-5" color="#F59E0B" />, trend: "Days" }
    ];

    const timeline = [
        { date: "Today, 2:45 PM", event: "Logged 'Lean Mutton Stew'", type: "meal", impact: "Safe" },
        { date: "Yesterday", event: "Completed 7-day hydration goal", type: "milestone", impact: "Award" },
        { date: "Feb 12", event: "Analyzed 'Paneer Tikka'", type: "search", impact: "Moderate" },
        { date: "Feb 10", event: "New HbA1c result uploaded", type: "data", impact: "Improved" }
    ];

    return (
        <div className="max-w-7xl mx-auto pb-12">
            {/* Profile Identity Section */}
            <div className="relative mb-20 pt-8 px-4">
                <div className="flex items-center gap-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-40 h-40 rounded-3xl bg-dark-800 border-4 border-slate-700/50 flex items-center justify-center text-6xl font-black shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent group-hover:from-brand-500/40 transition-all"></div>

                        {/* Interactive Border Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/20 via-transparent to-brand-500/20 animate-pulse"></div>
                        </div>

                        <span className="relative z-10 text-white group-hover:scale-110 transition-all">M</span>

                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all">
                            <Zap size={28} className="text-brand-400 mb-1" />
                            <span className="text-xs font-black text-white uppercase tracking-widest">Edit</span>
                        </div>
                    </motion.div>

                    <div>
                        <motion.div
                            whileHover={{ x: 10 }}
                            className="cursor-pointer group relative"
                        >
                            <h1 className="text-6xl font-black text-white mb-2 group-hover:text-brand-400 transition-all tracking-tight">
                                {user.name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-brand-500 font-bold text-sm uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Edit Profile Information <ChevronRight size={16} />
                                </span>
                            </div>
                        </motion.div>
                        <div className="flex items-center gap-5 mt-5">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="bg-brand-500/10 text-brand-400 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-brand-500/20 cursor-default"
                            >
                                {user.status}
                            </motion.span>
                            <span className="text-white/60 text-sm font-bold flex items-center gap-2">
                                <Calendar size={14} className="text-brand-400" /> Member since {user.memberSince}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Stats & Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <Info className="w-5 h-5 text-brand-500" />
                            Personal Details
                        </h3>
                        <div className="space-y-4">
                            <InfoRow icon={<Mail size={18} />} label="Email" value={user.email} />
                            <InfoRow icon={<Phone size={18} />} label="Phone" value={user.phone} />
                            <InfoRow icon={<MapPin size={18} />} label="Location" value={user.location} />
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-dark-800 rounded-3xl p-6 border border-slate-700/50 shadow-xl overflow-hidden relative group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-brand-500/20 transition-all"></div>
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-500" />
                            Achievements
                        </h3>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <AchievementIcon label="Master Chef" icon="👨‍🍳" />
                            <AchievementIcon label="Consistency" icon="🎯" />
                            <AchievementIcon label="Health Pro" icon="🌟" />
                        </div>
                    </div>
                </div>

                {/* Center / Right: Health Metrics & Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Health Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-dark-800 p-6 rounded-3xl border border-slate-700/50 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="p-3 bg-white/5 w-fit rounded-xl mb-4">
                                    {m.icon}
                                </div>
                                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{m.label}</h4>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-black text-white">{m.value}</span>
                                    <span className={`text-[10px] font-bold pb-1 flex items-center ${m.trend.startsWith('-') ? 'text-green-400' : 'text-slate-400'}`}>
                                        {m.trend.startsWith('-') ? <TrendingDown size={10} className="mr-0.5" /> : null}
                                        {m.trend}
                                    </span>
                                </div>
                                <div className="mt-4 w-full h-1 bg-slate-700/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Timeline */}
                    <div className="bg-dark-800 rounded-3xl p-8 border border-slate-700/50 shadow-xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="w-6 h-6 text-brand-500" />
                                Recent Activity
                            </h3>
                            <button className="text-xs font-bold text-brand-500 hover:text-brand-400 flex items-center gap-1 uppercase tracking-widest transition-colors">
                                View Full History <ChevronRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700/30">
                            {timeline.map((item, idx) => (
                                <div key={idx} className="flex gap-6 relative group">
                                    <div className={`w-6 h-6 rounded-full shrink-0 z-10 border-4 border-dark-800 flex items-center justify-center transition-all ${item.impact === 'Safe' ? 'bg-green-500' :
                                        item.impact === 'Award' ? 'bg-yellow-500' :
                                            item.impact === 'Moderate' ? 'bg-blue-500' : 'bg-brand-500'
                                        }`}>
                                    </div>
                                    <div className="flex-1 pb-6 border-b border-slate-700/30 group-last:border-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-white group-hover:text-brand-400 transition-colors uppercase tracking-tight">{item.event}</h4>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{item.date}</span>
                                        </div>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${item.impact === 'Safe' ? 'text-green-500 bg-green-500/10' :
                                            item.impact === 'Moderate' ? 'text-blue-500 bg-blue-500/10' :
                                                item.impact === 'Improved' ? 'text-brand-500 bg-brand-500/10' : 'text-yellow-500 bg-yellow-500/10'
                                            }`}>
                                            {item.impact}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SettingsCard
                            title="Health Alerts"
                            desc="Real-time notifications for high carb impact."
                            icon={<Shield className="text-blue-500" />}
                            active={settings.healthAlerts}
                            onToggle={() => toggleSetting('healthAlerts')}
                        />
                        <SettingsCard
                            title="Daily Reminders"
                            desc="Stay consistent with hydration and meal logs."
                            icon={<Bell className="text-amber-500" />}
                            active={settings.dailyReminders}
                            onToggle={() => toggleSetting('dailyReminders')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 group">
        <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-500 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-all">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-medium text-white">{value}</p>
        </div>
    </div>
);

const AchievementIcon = ({ label, icon }) => (
    <div className="shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/20 transition-all">
        <span className="text-2xl">{icon}</span>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{label}</span>
    </div>
);

const SettingsCard = ({ title, desc, icon, active, onToggle }) => (
    <div
        onClick={onToggle}
        className="bg-dark-800 p-6 rounded-3xl border border-slate-700/50 flex items-center justify-between group cursor-pointer hover:border-brand-500/30 transition-all"
    >
        <div className="flex gap-4 items-center">
            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-brand-500/10 transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-white text-sm">{title}</h4>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
        </div>
        <div className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? 'bg-brand-500' : 'bg-slate-700'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`}></div>
        </div>
    </div>
);

export default Profile;
