/**
 * API Configuration Source of Truth
 * Update these values to globally change API endpoints and keys.
 */

// Foodoscope / CoSyLab API Config
export const FOODOSCOPE_CONFIG = {
    BASE_URL: 'http://cosylab.iiitd.edu.in:6969',
    BEARER_TOKEN: '5aL70wvfMjp9BG0GW0AK5NMGmC3ZMqVvz_oFdtWVoBZ02I5h',
    // Sub-paths for specific services
    RECIPE_PATH: '/recipe2-api',
    FLAVOR_PATH: '/flavordb',
};

// Local Backend API Config
export const BACKEND_CONFIG = {
    BASE_URL: 'http://localhost:5000/api',
};
