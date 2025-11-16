document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // RSVP (Yes / No)
  // =========================
  const yesBtn = document.querySelector(".btn-yes");
  const noBtn = document.querySelector(".btn-no");
  const messageBox = document.getElementById("invite-message");
  const detailsForm = document.getElementById("details-form");
  const nameInput = document.getElementById("guest-name");
  const countInput = document.getElementById("guest-count");

  function saveRsvp(entry) {
    try {
      const key = "rsvpList";
      const existing = localStorage.getItem(key);
      let list = [];

      if (existing) {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      }

      list.push(entry);
      localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
      // Wenn localStorage nicht verfügbar ist, einfach still ignorieren
      console.warn("Could not save RSVP in localStorage:", e);
    }
  }

  if (yesBtn && noBtn && messageBox) {
    yesBtn.addEventListener("click", () => {
      messageBox.textContent = "We are so happy that you will join us.";
      if (detailsForm) {
        detailsForm.hidden = false;
      }

      saveRsvp({
        answer: "yes",
        createdAt: new Date().toISOString(),
      });
    });

    noBtn.addEventListener("click", () => {
      messageBox.textContent = "Thank you for your reply – we will miss you.";
      if (detailsForm) {
        detailsForm.hidden = true;
      }
      if (nameInput) nameInput.value = "";
      if (countInput) countInput.value = "";

      saveRsvp({
        answer: "no",
        createdAt: new Date().toISOString(),
      });
    });
  }

  if (detailsForm && messageBox && nameInput && countInput) {
    detailsForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = nameInput.value.trim();
      const persons = countInput.value.trim();

      saveRsvp({
        answer: "yes-details",
        name,
        persons,
        createdAt: new Date().toISOString(),
      });

      messageBox.textContent = "Thank you, your details have been saved.";
      detailsForm.hidden = true;
      detailsForm.reset();
    });
  }

  // =========================
  // Invitation card slider
  // =========================
  const images = Array.from(document.querySelectorAll(".card-image"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prevBtn = document.querySelector(".card-prev");
  const nextBtn = document.querySelector(".card-next");

  let currentIndex = 0;

  function normalizeIndex(index, length) {
    if (length === 0) return 0;
    return (index % length + length) % length;
  }

  function showSlide(index) {
    if (!images.length) return;

    currentIndex = normalizeIndex(index, images.length);

    images.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });

    // Dots nur aktualisieren, wenn Anzahl passt
    if (dots.length === images.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  if (images.length) {
    // Start auf erster Karte
    showSlide(0);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentIndex + 1);
      });
    }

    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          showSlide(i);
        });
      });
    }
  }
});
