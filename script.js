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

    // aktive Karte setzen
    images.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });

    // aktive Punkte setzen (falls vorhanden)
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

  // === POPUP / LIGHTBOX FÜR DIE BILDER + DOWNLOAD ===
  const popup      = document.getElementById("image-popup");
  const popupImg   = document.getElementById("popup-img");
  const closeBtn   = document.querySelector(".popup-close");
  const downloadBtn = document.getElementById("download-btn");

  if (popup && popupImg && downloadBtn) {
    // Alle Slider-Bilder klickbar machen
    images.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        // Popup sichtbar machen
        popup.style.display = "flex";

        // Bild setzen
        popupImg.src = img.src;
        popupImg.alt = img.alt || "";

        // Download-Link auf das aktuelle Bild setzen
        downloadBtn.href = img.src;

        // Sinnvollen Dateinamen setzen (z.B. card1.jpg)
        const parts = img.src.split("/");
        downloadBtn.download = parts[parts.length - 1] || "bild.jpg";
      });
    });

    // Schließen über X
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        popupImg.src = "";
      });
    }

    // Klick auf den dunklen Hintergrund schließt das Popup
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
        popupImg.src = "";
      }
    });
  }
});
