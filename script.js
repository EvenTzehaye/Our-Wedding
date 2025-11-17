
document.addEventListener("DOMContentLoaded", function () {
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSerhukW0UQ54-O49QE14_3e4Orlxt5SnFOxMpC4uwNY_2QzKQ/viewform?usp=header";

  // === YES / NO Buttons mit Google Form verbinden ===
  const yesBtn = document.querySelector(".btn-yes");
  const noBtn  = document.querySelector(".btn-no");

  if (yesBtn) {
    yesBtn.addEventListener("click", function () {
      window.open(GOOGLE_FORM_URL, "_blank");
    });
  }

  // Optional: auch "Sorry, I cannot attend" über dasselbe Formular
  if (noBtn) {
    noBtn.addEventListener("click", function () {
      window.open(GOOGLE_FORM_URL, "_blank");
    });
  }

  // === SLIDER-FUNKTION ===
  const images = document.querySelectorAll(".card-frame .card-image");
  const dots   = document.querySelectorAll(".card-dots .dot");
  const prev   = document.querySelector(".card-prev");
  const next   = document.querySelector(".card-next");

  let currentIndex = 0;

  function showSlide(index) {
    if (!images.length) return;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentIndex = index;

    images.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  if (prev) {
    prev.addEventListener("click", function () {
      showSlide(currentIndex - 1);
    });
  }

  if (next) {
    next.addEventListener("click", function () {
      showSlide(currentIndex + 1);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", function () {
      const idx = parseInt(dot.dataset.index, 10);
      if (!isNaN(idx)) {
        showSlide(idx);
      }
    });
  });

  // Startzustand
  showSlide(0);
});
