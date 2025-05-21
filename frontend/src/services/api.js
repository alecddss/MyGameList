const API_KEY = "6766b150a805b9527d272e40a4b505592ccd0959";
const BASE_URL = "/api";

export const getRecentGames = async () => {
    const response = await fetch(`${BASE_URL}/api/games/?api_key=${API_KEY}&format=json&limit=50&sort=date_added:asc&filter=expected_release_year:2024`);
    const data = await response.json()
    return data.results
};

export const getGames = async () => {
    const response = await fetch(`${BASE_URL}/api/games/?api_key=${API_KEY}&format=json`);
    const data = await response.json()
    return data.results
};

export const searchGames = async (query) => {
    const response = await fetch(`${BASE_URL}/api/search/?api_key=${API_KEY}&query=${encodeURIComponent(query)}&resources=game&format=json`);
    const data = await response.json()
    return data.results
};

