import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-500">
                            CarbCare
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button
                                onClick={() => navigate('/analyzer')}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-slate-200"
                            >
                                Analyzer
                            </button>
                            <button
                                onClick={() => navigate('/history')}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-slate-200"
                            >
                                History
                            </button>
                            <button
                                onClick={() => navigate('/suggestions')}
                                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors text-slate-200"
                            >
                                Suggestions
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
