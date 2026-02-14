import React, { useState, useEffect } from 'react';
import Hero from '../components/landing/Hero';
import ComprehensiveCare from '../components/landing/ComprehensiveCare';
import Features from '../components/landing/Features';
import Stats from '../components/landing/Stats';
import Footer from '../components/landing/Footer';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-dark-900 text-white selection:bg-brand-500/30">
            {/* Header / Navbar */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <span className="font-black text-xl">H</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">HealthAssist</span>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Analysis</a>
                        <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Community</a>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400">
                            <Moon size={20} />
                        </button>
                    </div>

                    <button className="md:hidden p-2 text-slate-400">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            <main>
                <Hero />
                <ComprehensiveCare />
                <Features />
                <Stats />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
