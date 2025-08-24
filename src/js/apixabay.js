

const API_KEY = "51915317-a5ee9a5ba63d3f1e31a6123a4";
const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query, page = 1) {
    const perPage = 20;
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Помилка при запиті до Pixabay:", error);
        return null;
    };
    
}