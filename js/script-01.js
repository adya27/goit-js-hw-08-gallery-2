import gallery from "./data/gallery-items.js";

const gallaryList = document.querySelector(".js-gallery");
const modalItem = document.querySelector(".lightbox__overlay");
const lightboxItem = document.querySelector(".js-lightbox");
const closeBtnlItem = document.querySelector(".lightbox__button");
const rightBtnlItem = document.querySelector('[data-action = "right-button"]');
const leftBtnlItem = document.querySelector('[data-action = "left-button"]');
const bodyItem = document.querySelector("body");

const galleryOriginalImagesArray = [];
let currentImage;
let currentImageIndex;

appendGalleryMarkup(gallery);
gallaryList.addEventListener("click", onClickGalleryLinkItem);
gallery.forEach((image) => {
  galleryOriginalImagesArray.push(image.original);
});

function createPictureMarkup({ description, original, preview }) {
  return `<li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`;
}

function createPictureMarkupInModal(description, original) {
  lightboxItem.classList.add("is-open");
  bodyItem.classList.add("modal-is-open");

  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="lightbox__content">
        <img
            class="lightbox__image"
            src="${original}"
            data-source="${description}"
            alt="${description}"
        />
        </div>`
  );
}

function createGalleryMarkup(gallery) {
  return gallery.map((item) => createPictureMarkup(item)).join("");
}

function appendGalleryMarkup(gallery) {
  return gallaryList.insertAdjacentHTML(
    "afterbegin",
    createGalleryMarkup(gallery)
  );
}

function onClickCloseBtnItem() {
  lightboxItem.classList.remove("is-open");

  modalItem.textContent = "";
}

function onClickGalleryLinkItem(e) {
  e.preventDefault();

  currentImage = e.target.dataset.source;

  currentImageIndex = galleryOriginalImagesArray.indexOf(currentImage);

  if (e.target.nodeName !== "IMG") {
    return;
  }
  let original = e.target.closest(".gallery__link").getAttribute("href");
  let description = e.target.getAttribute("alt");
  createPictureMarkupInModal(description, original);

  document.addEventListener("keydown", onKeyDown);
  lightboxItem.addEventListener("click", onBackdropClick);
  rightBtnlItem.addEventListener("click", onRightBtnClick);
  leftBtnlItem.addEventListener("click", onLeftBtnlClick);
  closeBtnlItem.addEventListener("click", onClickCloseBtnItem);
}

function onKeyDown(e) {
  if (e.key === "Escape") {
    onClickCloseBtnItem();
    document.removeEventListener("keydown", onEscKeyDown);
  } else if (e.key === "ArrowRight") {
    onRightBtnClick();
  } else if (e.key === "ArrowLeft") {
    onLeftBtnlClick();
  }
}
function onBackdropClick(e) {
  if (e.target.nodeName !== "IMG" && e.target.nodeName !== "BUTTON") {
    onClickCloseBtnItem();
    modalItem.removeEventListener("click", onBackdropClick);
  }
}

function onRightBtnClick() {
  modalItem.textContent = "";

  if (currentImageIndex < galleryOriginalImagesArray.length - 1) {
    currentImageIndex += 1;
  } else {
    currentImageIndex += 1 - galleryOriginalImagesArray.length;
  }

  return createNextModalImg();
}

function onLeftBtnlClick() {
  modalItem.textContent = "";

  if (currentImageIndex > 0) {
    currentImageIndex -= 1;
  } else {
    currentImageIndex += galleryOriginalImagesArray.length - 1;
  }

  return createNextModalImg();
}

function createNextModalImg() {
  return modalItem.insertAdjacentHTML(
    "afterbegin",
    `<div class="lightbox__content">
        <img
            class="lightbox__image"
            src="${galleryOriginalImagesArray[currentImageIndex]}"
           
        />
        </div>`
  );
}
