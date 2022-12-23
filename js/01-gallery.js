import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
let originalImgObj = {};

function createListGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</div> `;
    })
    .join(" ");
}

function getBigImg(items, smallImg) {
  return items.find((item) => item.preview === smallImg);
}

galleryEl.innerHTML = createListGallery(galleryItems);
galleryEl.addEventListener("click", onImgZoom);

function onImgZoom(event) {
  event.preventDefault();

  const getSmallImg = event.target.src;
  const originalTargetLinkImg = getBigImg(galleryItems, getSmallImg);

  originalImgObj = basicLightbox.create(`
    <img src='${originalTargetLinkImg.original}'>
`);

  originalImgObj.show(() => {
    document.addEventListener("keydown", onEscPress);
  });
}

function onEscPress(event) {
  if (!originalImgObj.visible()) {
    document.removeEventListener("keydown", onEscPress);
  }
  console.log("code: ", event.code);
  if (event.code === "Escape") {
    closeModal();
  }
}

function closeModal() {
  originalImgObj.close(() => {
    document.removeEventListener("keydown", onEscPress);
  });
}
