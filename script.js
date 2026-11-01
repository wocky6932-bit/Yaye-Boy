/* ========================================================
   LOGIQUE JS FIDÈLE AU CODE REACT
   Pour Yaye Boy ♡ • Mactar
   ======================================================== */

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  const envelopeBtn = document.getElementById('envelopeBtn');
  const siteContent = document.getElementById('siteContent');
  const introSection = document.getElementById('introSection');

  if (envelopeBtn) {
    envelopeBtn.classList.add('is-opening');
  }

  // Révélation et défilement fluide vers le héro (comme dans le useEffect / openLetter)
  setTimeout(() => {
    if (siteContent) {
      siteContent.classList.add('visible');
    }
    if (introSection) {
      introSection.style.display = 'none';
    }
    const birthdaySection = document.getElementById('birthday');
    if (birthdaySection) {
      birthdaySection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 1000);
}

function triggerKiss() {
  const kissReveal = document.getElementById('kissReveal');
  const kissButton = document.getElementById('kissButton');

  if (kissReveal) {
    kissReveal.style.display = 'grid';
  }
  if (kissButton) {
    kissButton.style.display = 'none';
  }
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('active');
}

function closeLightbox(e) {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('active');
  }
}