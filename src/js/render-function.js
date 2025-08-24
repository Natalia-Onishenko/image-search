export function clearGallery(galleryElement) {
   galleryElement.innerHTML = "";
}
export function renderGallery(galleryElement, images, append = false) {
    if (!images || images.length === 0) {
        galleryElement.innerHTML = '<p>Нічого не знайдено</p>';
        return;
    }
    const markup = images
        .map((img) => {
            return `
      <a href="${img.largeImageURL}" class="gallery-item">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
    `;
        })
        .join("");
    if (append) {
        galleryElement.insertAdjacentHTML('beforeend', markup);
    } else { 
        galleryElement.innerHTML = markup;
}
    }
