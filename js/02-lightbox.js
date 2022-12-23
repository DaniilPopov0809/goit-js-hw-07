import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

function createListGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`;
    })
    .join(" ");
}

galleryEl.innerHTML = createListGallery(galleryItems);  

let gallery = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});


