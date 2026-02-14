import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Tag, Check, ArrowRight, Search, Loader2, Globe, Sparkles, Star } from "lucide-react";
import { searchRecipesByTitle, getRecipesInfo, getRecipeOfDay, getRecipeInstructions } from "../services/recipeService";
import RecipeDetailModal from "../components/RecipeDetailModal";
import { useLocation } from "react-router-dom";

const Recipes = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeOfDay, setRecipeOfDay] = useState(null);
    const [error, setError] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const location = useLocation();

    const fallbackSpotlight = {
        Recipe_id: "spotlight_fallback",
        Recipe_title: "Healing Turmeric Ginger Soup",
        Region: "Global Recovery",
        total_time: "25",
        Calories: "145",
        Protein: "8.2g",
        Carbs: "18.5g",
        Fat: "4.1g",
        instructions: [
            "Gently sauté minced ginger and turmeric in a teaspoon of olive oil for 2 minutes.",
            "Add finely chopped carrots and celery, then sauté for another 5 minutes.",
            "Pour in 4 cups of low-sodium vegetable broth and bring to a simmer.",
            "Simmer until vegetables are very tender (about 15 minutes).",
            "Season with a pinch of sea salt and lemon juice. Serve warm for maximum comfort."
        ],
        desc: "A warm, anti-inflammatory powerhouse perfect for recovery days. Gentle on the stomach and rich in antioxidants."
    };

    useEffect(() => {
        const fetchDailySpotlight = async () => {
            try {
                const data = await getRecipeOfDay();
                console.log("Daily Spotlight Data:", data);

                // Flexible check for success (API returns boolean or string)
                const isSuccess = data && (data.success === true || data.success === "true" || data.recipe_id);

                let recipe = data?.message?.recipe || data?.payload?.recipe || data;

                if (isSuccess && recipe && recipe.Recipe_title) {
                    setRecipeOfDay(recipe);
                } else {
                    console.warn("API limit or bad data, using premium fallback spotlight.");
                    setRecipeOfDay(fallbackSpotlight);
                }
            } catch (err) {
                console.error("Failed to fetch daily recipe, showing fallback:", err);
                setRecipeOfDay(fallbackSpotlight);
            }
        };
        fetchDailySpotlight();
    }, []);

    // Handle incoming search from other pages (e.g. Dashboard)
    useEffect(() => {
        if (location.state?.query) {
            const q = location.state.query;
            setSearchQuery(q);
            executeSearch(q);
            // Clear state to prevent re-search on simple re-renders if needed, 
            // though React Router handles state persistence. 
            // We'll leave it to allow refreshing to keep the search.
        }
    }, [location.state]);

    const executeSearch = async (query) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const data = await searchRecipesByTitle(query);
            if (data && data.success && Array.isArray(data.data)) {
                setSearchResults(data.data);
                if (data.data.length === 0) {
                    performStaticFallback(query);
                }
            } else {
                performStaticFallback(query);
            }
        } catch (err) {
            console.error("Search API failed, falling back to curated list:", err);
            performStaticFallback(query);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        executeSearch(searchQuery);
    };

    const performStaticFallback = (query) => {
        const q = query.toLowerCase();
        // Search in both staticRecipes and our spotlight fallback
        const allLocal = [...staticRecipes, fallbackSpotlight];
        const matches = allLocal.filter(r =>
            r.Recipe_title.toLowerCase().includes(q) ||
            (r.desc && r.desc.toLowerCase().includes(q)) ||
            (r.tags && r.tags.some(t => t.toLowerCase().includes(q)))
        );

        if (matches.length > 0) {
            setSearchResults(matches);
            setError("Note: Live search limited. Showing best matches from our curated recovery database.");
        } else {
            setSearchResults([]);
            setError(`No local matches for "${query}". Try 'Soup', 'Rice', or 'Quinoa'.`);
        }
    };

    const handleSelectRecipe = async (recipe) => {
        console.log("Card clicked:", recipe.Recipe_title || recipe.title);

        // 1. OPEN MODAL IMMEDIATELY with available data
        const initialInstructions = recipe.instructions || [];
        const displayTitle = recipe.Recipe_title || recipe.title;

        // Persist existing details if we are clicking a card we already enriched (optimization)
        const existingFullDetails = recipe.Protein && recipe.Calories ? recipe : null;

        setSelectedRecipe({
            ...recipe,
            Recipe_title: displayTitle,
            instructions: initialInstructions
        });

        // If we already have full details (Protein is present), we are good.
        // Also if it's a static/spotlight recipe, we likely have what we need (or can't get more).
        if (existingFullDetails || (String(recipe.Recipe_id).startsWith('static') || String(recipe.Recipe_id).startsWith('spotlight'))) {
            return;
        }

        // 2. BACKGROUND ENRICHMENT
        // We act optimistically: Open modal, then hunt for data.
        try {
            const targetId = recipe.Recipe_id || recipe.id;
            console.log(`Attempting to enrich recipe ${targetId} (${displayTitle})...`);

            // Fetch instructions specific to ID (fast-ish) and broad data (slow) in parallel
            // We fetch 5 pages (500 items) which covers most "relevant" search results if the DB returns them in some order
            const fetchPromise = Promise.all([
                targetId ? getRecipeInstructions(targetId).catch(() => null) : null,
                getRecipesInfo(1, 100).catch(() => null),
                getRecipesInfo(2, 100).catch(() => null),
                getRecipesInfo(3, 100).catch(() => null),
                getRecipesInfo(4, 100).catch(() => null),
                getRecipesInfo(5, 100).catch(() => null)
            ]);

            const results = await fetchPromise;
            const instructionsData = results[0];
            const broadDataPages = results.slice(1);

            const allInfo = broadDataPages.reduce((acc, batch) => acc.concat(batch?.payload?.data || []), []);

            // Find our recipe in the haystack
            const detailedInfo = allInfo.find(r =>
                String(r.Recipe_id) === String(targetId) ||
                r.Recipe_title === displayTitle
            );

            if (detailedInfo) {
                console.log("Found detailed info via enrichment:", detailedInfo.Recipe_title);
            } else {
                console.log("Could not find detailed info in first 500 records.");
            }

            // Merge everything
            const apiInstructions = instructionsData?.steps || [];
            const finalInstructions = apiInstructions.length > 0 ? apiInstructions : initialInstructions;

            setSelectedRecipe(prev => {
                // Only update if we are still looking at the same recipe
                if (!prev || (prev.Recipe_id !== recipe.Recipe_id && prev.id !== recipe.id)) return prev;

                return {
                    ...prev,
                    ...(detailedInfo || {}), // Merge in Protein, Carbs, Fat etc.
                    instructions: finalInstructions.length > 0 ? finalInstructions : (detailedInfo?.Processes ? detailedInfo.Processes.split('||') : prev.instructions)
                };
            });

        } catch (err) {
            console.error("Error during background enrichment:", err);
        }
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setError(null);
    };

    const staticRecipes = [
        {
            Recipe_id: "static_mutton",
            Recipe_title: "Lean Mutton & Barley Stew",
            desc: "Slow-cooked lean mutton with pearled barley. High in iron and fiber, ideal for sustained recovery energy.",
            image: "https://images.unsplash.com/photo-1626804475297-411d8c660bb0?auto=format&fit=crop&q=80&w=600",
            Region: "International",
            total_time: "45",
            Calories: "310",
            Protein: "24.5g",
            Carbs: "22.1g",
            Fat: "12.4g",
            tags: ["High Iron", "Fiber Rich", "Non-Veg"],
            instructions: [
                "Trim all visible fat from the mutton cubes.",
                "In a pot, lightly brown the meat with a dash of olive oil.",
                "Add 6 cups of water, rinsed barley, carrots, and thyme.",
                "Simmer for 35-40 minutes until meat is very tender.",
                "Season minimally and serve as a hearty, safe meal."
            ]
        },
        {
            Recipe_id: "static_chicken",
            Recipe_title: "Ginger Steamed Chicken",
            desc: "Tender chicken breast steamed with thin ginger slivers. Low oil, easy to digest, and very soothing.",
            image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600",
            Region: "Asian",
            total_time: "20",
            Calories: "240",
            Protein: "32.1g",
            Carbs: "2.4g",
            Fat: "8.5g",
            tags: ["High Protein", "Soothing", "Non-Veg"],
            instructions: [
                "Marinate chicken strips with ginger and a touch of light soy sauce.",
                "Place in a steaming basket over boiling water.",
                "Steam for 12-15 minutes until fully cooked but moist.",
                "Serve with a side of steamed pak choi or plain rice."
            ]
        },
        {
            Recipe_id: "static_paneer",
            Recipe_title: "Mild Palak Paneer",
            desc: "Soft cottage cheese cubes in a smooth spinach puree. Excellent source of iron and protein for recovery.",
            image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&q=80&w=600",
            Region: "Indian",
            total_time: "25",
            Calories: "210",
            Protein: "14.2g",
            Carbs: "8.5g",
            Fat: "12.8g",
            tags: ["Iron Rich", "Protein", "Vegetarian"],
            instructions: [
                "Blanch fresh spinach leaves and blend into a smooth paste.",
                "In a pan, lightly sauté small paneer cubes until golden.",
                "Sauté cumin seeds, ginger, and garlic paste in minimal oil.",
                "Add spinach puree and simmer for 5 minutes with a touch of salt.",
                "Fold in the paneer cubes and serve hot with plain roti or rice."
            ]
        },
        {
            Recipe_id: "static_tomato_soup",
            Recipe_title: "Tomato Basil Soup",
            desc: "Rich tomato soup with fresh basil. Comforting, hydrating, and full of antioxidants.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600",
            Region: "International",
            total_time: "20",
            Calories: "180",
            Protein: "4.0g",
            Carbs: "22.0g",
            Fat: "8.0g",
            tags: ["Vegetarian", "Tomato", "Comfort"],
            instructions: [
                "Roast tomatoes and garlic until soft.",
                "Blend with fresh basil and vegetable broth.",
                "Simmer for 10 minutes and season with black pepper.",
                "Serve hot with a side of steamed bread."
            ]
        },
        {
            Recipe_id: "static_salad",
            Recipe_title: "Zesty Chickpea Salad",
            desc: "Crunchy chickpeas with cucumber and lemon. High fiber and refreshing.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
            Region: "Middle Eastern",
            total_time: "10",
            Calories: "245",
            Protein: "12.0g",
            Carbs: "34.0g",
            Fat: "6.0g",
            tags: ["High Fiber", "Refreshing", "Vegan", "Tomato"],
            instructions: [
                "Toss boiled chickpeas with diced cucumber and tomatoes.",
                "Dress with lemon juice, olive oil, and a pinch of roasted cumin.",
                "Garnish with fresh parsley and serve chilled."
            ]
        },
        {
            Recipe_id: "static_1",
            Recipe_title: "Soft Khichdi",
            desc: "Go easy on spices, well-cooked rice and lentils. Rich in essential minerals and gentle on the stomach.",
            image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=600",
            total_time: "20",
            Calories: "180",
            Protein: "9.2g",
            Carbs: "32.4g",
            Fat: "2.1g",
            tags: ["Easy To Digest", "Low Impact"],
            instructions: [
                "Wash rice and moong dal together and soak for 30 minutes.",
                "In a pressure cooker, add the soaked mix with 4 cups of water and a pinch of turmeric.",
                "Cook for 4-5 whistles until very soft.",
                "Mash slightly and serve warm with a tiny bit of ghee."
            ]
        },
        {
            Recipe_id: "static_2",
            Recipe_title: "Boiled Vegetable Soup",
            desc: "Mildly spiced with tender cooked vegetables. Perfect for hydration and micronutrient intake.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600",
            total_time: "15",
            Calories: "120",
            Protein: "4.5g",
            Carbs: "12.2g",
            Fat: "0.8g",
            tags: ["Hydrating", "Vitamin Rich"],
            instructions: [
                "Chop carrots, beans, and bottle gourd into small cubes.",
                "Boil in water with a salt and a hint of black pepper.",
                "Once tender, blend half the vegetables for a thicker consistency if desired.",
                "Garnish with fresh coriander and serve hot."
            ]
        },
        {
            Recipe_id: "static_3",
            Recipe_title: "Green Quinoa Bowl",
            desc: "Protein-packed quinoa with steamed greens and avocado for sustained energy.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
            total_time: "25",
            Calories: "320",
            Protein: "14.2g",
            Carbs: "42.8g",
            Fat: "11.5g",
            tags: ["Low Glycemic", "High Protein"],
            instructions: [
                "Rinse quinoa and boil in a 1:2 ratio with water until fluffy.",
                "Lightly steam spinach and broccoli for 3 minutes.",
                "Toss quinoa with greens, olive oil, and lemon juice.",
                "Top with sliced avocado and sunflower seeds."
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Recovery Assistance</h1>
                    <p className="text-slate-400 max-w-xl">Personalized meal suggestions and dietary guidelines tailored for your specific recovery phase and diabetic needs.</p>
                </div>
            </header>

            {/* Daily Spotlight Hero Section */}
            {!searchResults.length && recipeOfDay && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 relative rounded-[40px] overflow-hidden bg-gradient-to-br from-brand-600/20 via-dark-800 to-dark-800 border border-brand-500/20 shadow-2xl group cursor-pointer"
                    onClick={() => handleSelectRecipe(recipeOfDay)}
                >
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                        <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-800 lg:bg-gradient-to-r lg:from-transparent lg:to-dark-800 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                alt="Recipe of the day"
                            />
                            <div className="absolute top-6 left-6 z-20 flex gap-3">
                                <span className="px-4 py-2 rounded-2xl bg-brand-500 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                    <Sparkles size={14} /> Spotlight
                                </span>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center relative z-20">
                            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4">
                                <Star size={14} className="fill-brand-400" /> Handpicked for Today
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight group-hover:text-brand-500 transition-colors">
                                {recipeOfDay.Recipe_title}
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 line-clamp-2 leading-relaxed max-w-lg">
                                Discover why this {recipeOfDay.Region} delight is the perfect balance for your recovery journey today. Rich in flavor and nutrition.
                            </p>

                            <div className="flex flex-wrap items-center gap-8 mb-10 text-slate-300">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Time</span>
                                    <span className="flex items-center gap-2 font-bold"><Clock size={16} className="text-brand-500" /> {recipeOfDay.total_time || '30'}m</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Impact</span>
                                    <span className="flex items-center gap-2 font-bold"><Flame size={16} className="text-orange-500" /> Safe & Low Carbs</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Origin</span>
                                    <span className="flex items-center gap-2 font-bold"><Globe size={16} className="text-blue-500" /> {recipeOfDay.Region}</span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectRecipe(recipeOfDay);
                                }}
                                className="self-start px-8 py-4 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-500 hover:text-white transition-all transform hover:translate-x-2 shadow-xl flex items-center gap-2 group/btn"
                            >
                                Reveal Recipe <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="font-bold text-xl text-white">
                            {searchResults.length > 0 ? `Results for "${searchQuery}"` : "Recipe Discovery"}
                        </h3>

                        <div className="flex items-center gap-2">
                            <form onSubmit={handleSearch} className="relative group w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-500 transition-colors" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by title..."
                                    className="w-full bg-dark-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 transition-all"
                                />
                            </form>
                            {(searchResults.length > 0 || error) && (
                                <button
                                    onClick={clearSearch}
                                    className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-wider"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className={`border rounded-2xl p-4 text-sm flex items-center gap-3 ${error.includes("Note:")
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${error.includes("Note:") ? "bg-amber-500" : "bg-red-500"}`} />
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                            <Loader2 className="w-8 h-8 animate-spin mb-4" />
                            <p>Fetching delicious recipes...</p>
                        </div>
                    ) : (
                        <>
                            {searchResults.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {searchResults.map((recipe, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => handleSelectRecipe(recipe)}
                                            className="bg-dark-800 rounded-3xl overflow-hidden shadow-xl border border-slate-700/50 group hover:border-brand-500/50 transition-all cursor-pointer relative z-10"
                                        >
                                            <div className="h-48 overflow-hidden relative bg-slate-800">
                                                <div className="absolute top-4 left-4 flex gap-2 z-10">
                                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-white">
                                                        {recipe.Region || 'Recipe'}
                                                    </span>
                                                </div>
                                                <img
                                                    src={`https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=600`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    alt={recipe.Recipe_title}
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-500 transition-colors line-clamp-1">
                                                    {recipe.Recipe_title}
                                                </h3>
                                                <p className="text-slate-400 text-xs mb-6 line-clamp-2 leading-relaxed">
                                                    Region: {recipe.Region}, {recipe.Continent}. Nutritious meal from the global database.
                                                </p>

                                                <div className="flex items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-t border-slate-700/50 pt-4">
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.total_time || '20'}m</span>
                                                    <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.Calories || '250'} kcal</span>
                                                    <div className="ml-auto p-1.5 bg-brand-500/10 rounded-full text-brand-500">
                                                        <Tag className="w-3 h-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <h3 className="font-bold text-lg text-white mb-4">Recovery Friendly Recommendations</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {staticRecipes.map((recipe, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                whileHover={{ y: -8 }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ delay: idx * 0.1 }}
                                                onClick={() => handleSelectRecipe(recipe)}
                                                className="bg-dark-800 rounded-3xl overflow-hidden shadow-xl border border-slate-700/50 group hover:border-brand-500/50 transition-all cursor-pointer relative z-10"
                                            >
                                                <div className="h-48 overflow-hidden relative bg-slate-800">
                                                    <div className="absolute top-4 left-4 flex gap-2 z-10">
                                                        {recipe.tags.map(tag => (
                                                            <span key={tag} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag === 'Easy To Digest' ? 'bg-green-500 text-white' :
                                                                tag === 'Low Impact' ? 'bg-blue-500 text-white' :
                                                                    'bg-slate-700 text-white'
                                                                }`}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={recipe.Recipe_title} />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-500 transition-colors">{recipe.Recipe_title}</h3>
                                                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{recipe.desc}</p>

                                                    <div className="flex items-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-wider border-t border-slate-700/50 pt-4">
                                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {recipe.total_time}m</span>
                                                        <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> {recipe.Calories}</span>
                                                        <div className="ml-auto p-2 bg-brand-500/10 rounded-full text-brand-500">
                                                            <Tag className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Care Spotlight Sidebar Option (Moved to TOP) */}
                    {recipeOfDay && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSelectRecipe(recipeOfDay)}
                            className="bg-gradient-to-br from-brand-600/30 to-dark-800 rounded-3xl p-1 border border-brand-500/30 shadow-xl cursor-pointer group overflow-hidden relative"
                        >
                            <div className="p-6 bg-dark-900/60 backdrop-blur-md rounded-[22px]">
                                <div className="flex items-center gap-2 text-brand-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                                    <Sparkles size={12} /> Care Spotlight
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-brand-400 transition-colors">
                                    {recipeOfDay.Recipe_title || "Recipe of the Day"}
                                </h4>
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">Time</span>
                                        <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                                            <Clock size={12} className="text-brand-500" /> {recipeOfDay.total_time || '30'}m
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">Health</span>
                                        <span className="text-xs text-slate-300 font-bold flex items-center gap-1">
                                            <Flame size={12} className="text-orange-500" /> Safe Impact
                                        </span>
                                    </div>
                                    <div className="ml-auto p-2 bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-all" />
                        </motion.div>
                    )}

                    <div className="bg-brand-500/5 rounded-3xl p-8 border border-brand-500/10">
                        <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                            Foods to avoid while recovering
                        </h3>

                        <ul className="space-y-4">
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Opt for clearer, milder broths and light proteins.
                            </li>
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Eat baked items instead of fried or oily snacks.
                            </li>
                            <li className="flex gap-3 text-slate-400 text-sm leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                Avoid overly spicy, creamy, or acidic dishes.
                            </li>
                        </ul>

                        <button className="mt-8 bg-red-500/20 text-red-300 font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors">
                            Hard to digest
                        </button>
                    </div>

                </div>
            </div>

            <AnimatePresence>
                {selectedRecipe && (
                    <RecipeDetailModal
                        recipe={selectedRecipe}
                        onClose={() => setSelectedRecipe(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Recipes;
