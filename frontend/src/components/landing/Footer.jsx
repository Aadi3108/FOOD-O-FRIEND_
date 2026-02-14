import React from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle, Facebook, Twitter, Youtube, Share2, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="pt-24 pb-12 bg-dark-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                {/* CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-dark-800/80 backdrop-blur-xl border border-white/5 rounded-[48px] p-12 lg:p-20 overflow-hidden mb-24 text-center"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-500/10 blur-[120px] rounded-full -z-10" />

                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">Ready to take control?</h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Join thousands of users who have transformed their health journey with HealthAssist.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        <button className="flex items-center gap-3 px-8 py-4 bg-brand-500 hover:bg-brand-600 rounded-2xl transition-all shadow-xl shadow-brand-500/20 group">
                            <Apple fill="white" size={24} />
                            <div className="text-left">
                                <p className="text-[10px] opacity-70 leading-none">Download on the</p>
                                <p className="text-lg font-bold leading-none">App Store</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all">
                            <PlayCircle size={24} />
                            <div className="text-left">
                                <p className="text-[10px] opacity-70 leading-none">GET IT ON</p>
                                <p className="text-lg font-bold leading-none">Google Play</p>
                            </div>
                        </button>
                    </div>

                    <p className="text-sm text-slate-500">Free to download. Premium features available.</p>
                </motion.div>

                {/* Footer Links */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-12">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center font-bold">H</div>
                        <span className="text-xl font-bold">HealthAssist</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                        <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-brand-400 transition-colors">Contact Us</a>
                    </div>

                    <div className="flex items-center gap-6 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Share2 size={20} /></a>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/5">
                    <p className="text-xs text-slate-500">
                        © 2024 HealthAssist Inc. All rights reserved. Built with <Heart size={10} className="inline text-brand-500" /> for your health.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
