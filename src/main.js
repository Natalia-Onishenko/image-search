import { fetchImages } from "./js/apixabay.js";
import { renderGallery, clearGallery } from "./js/render-function.js";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let lightbox = null;
let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

hideLoadMore(); // ховаємо кнопку на початку

form.addEventListener("submit", onSearch);
loadMoreBtn.addEventListener("click", onLoadMore);

// --- Функція пошуку ---
async function onSearch(e) {
    e.preventDefault();
    const query = e.currentTarget.searchQuery.value.trim();
    if (!query) return;

    currentQuery = query;
    currentPage = 1;
    clearGallery(gallery);
    hideLoadMore();

    e.currentTarget.searchQuery.value = "";
    e.currentTarget.searchQuery.focus();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        if (!data || data.hits.length === 0) {
            gallery.innerHTML = "<p>Нічого не знайдено</p>";
            return;
        }

        totalHits = data.totalHits;
        renderGallery(gallery, data.hits);

        initLightbox();

        // Показуємо Load More тільки якщо є ще картинки
        if (totalHits > data.hits.length) showLoadMore();

    } catch (error) {
        console.error("Помилка при завантаженні зображень:", error);
    }
}

// --- Функція Load More ---
async function onLoadMore() {
    currentPage++;
    hideLoadMore();

    try {
        const data = await fetchImages(currentQuery, currentPage);
        if (!data || data.hits.length === 0) return;

        renderGallery(gallery, data.hits, true);
        initLightbox();

        // Показуємо Load More якщо ще залишилися картинки
        const loadedImages = gallery.querySelectorAll("a").length;
        if (loadedImages < totalHits) showLoadMore();

        // Прокручуємо сторінку плавно
        if (gallery.firstElementChild) {
            const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
            window.scrollBy({ top: cardHeight * 2, behavior: "smooth" });
        }

    } catch (error) {
        console.error("Помилка при завантаженні додаткових зображень:", error);
    }
}

// --- Lightbox ---
function initLightbox() {
    if (lightbox) lightbox.destroy();
    lightbox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionDelay: 250,
    });
}

// --- Показати/сховати кнопку Load More ---
function showLoadMore() {
    loadMoreBtn.hidden = false;
}

function hideLoadMore() {
    loadMoreBtn.hidden = true;
}