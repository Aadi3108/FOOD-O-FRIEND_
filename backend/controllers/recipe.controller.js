exports.getRecommendations = async (req, res, next) => {
    // Mock Data for "Recovery Assistance" Page
    const recommendations = [
        {
            id: 1,
            title: "Soft Khichdi",
            desc: "Go easy on spices, well-cooked rice and lentils. Rich in essential minerals and gentle on the stomach.",
            image: "https://images.unsplash.com/photo-1543362906-acfc955b216e?auto=format&fit=crop&q=80&w=600",
            time: "20m",
            calories: "180 kcal",
            tags: ["Easy To Digest", "Low Impact"]
        },
        {
            id: 2,
            title: "Boiled Vegetable Soup",
            desc: "Mildly spiced with tender cooked vegetables. Perfect for hydration and micronutrient intake.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600",
            time: "15m",
            calories: "120 kcal",
            tags: ["Hydrating", "Vitamin Rich"]
        },
        {
            id: 3,
            title: "Green Quinoa Bowl",
            desc: "Protein-packed quinoa with steamed greens and avocado for sustained energy.",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
            time: "25m",
            calories: "320 kcal",
            tags: ["Low Glycemic", "High Protein"]
        },
        {
            id: 4,
            title: "Oatmeal with Berries",
            desc: "High fiber oats topped with antioxidant-rich berries. Great for stabilizing blood sugar.",
            image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600",
            time: "10m",
            calories: "250 kcal",
            tags: ["High Fiber", "Stable Energy"]
        }
    ];

    res.status(200).json({ success: true, data: recommendations });
};

exports.searchByIngredients = async (req, res, next) => {
    const { ingredients } = req.body; // Expect array of strings e.g., ["onion", "tomato"]

    // In a real app, this would query a Recipe Database using these ingredients
    // Mock logic: Returns generic "Cook with what you have" recipes

    const matchedRecipes = [
        {
            title: `Quick ${ingredients[0] || 'Veggie'} Stir Fry`,
            desc: `Use your ${ingredients.join(', ')} to make a fast, healthy stir fry. Low oil, high flavor.`,
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
            time: "15m",
            calories: "200 kcal",
            tags: ["Pantry Special", "Quick"]
        },
        {
            title: "Hearty Stew",
            desc: "Slow cook these ingredients for a comforting meal.",
            image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
            time: "45m",
            calories: "350 kcal",
            tags: ["Comfort Food", "One Pot"]
        }
    ];

    res.status(200).json({ success: true, data: matchedRecipes });
};
