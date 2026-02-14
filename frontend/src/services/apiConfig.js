/**
 * API Configuration Source of Truth
 * Update these values to globally change API endpoints and keys.
 */

// Foodoscope / CoSyLab API Config
export const FOODOSCOPE_CONFIG = {
    BASE_URL: 'http://localhost:5000/api', // Point to local backend proxy
    BEARER_TOKEN: '', // Backend handles auth now
    // Sub-paths for specific services
    RECIPE_PATH: '/recipes', // Path is now directly mounted on /api/recipes
    FLAVOR_PATH: '/flavordb', // If you proxy this too, update accordingly
};

// Local Backend API Config
export const BACKEND_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
};
