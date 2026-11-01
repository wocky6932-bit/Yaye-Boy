/* ========================================================
   SCRIPT SCRAPBOOK TIKTOK FLUIDE • YAYE BOY ♡
   ======================================================== */

let isOpened = false;

function openLetterExperience() {
  if (isOpened) return;
  isOpened = true;

  const envelopeBox = document.getElementById('envelopeBox');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const mainExperience = document.getElementById('mainExperience');

  if (envelopeBox) {
    envelopeBox.classList.add('is-opening');
  }

  // Animation d'ouverture douce du rabat puis transition vers le flux continu
  setTimeout(() => {
    if (envelopeScreen) {
      envelopeScreen.classList.add('opened-dismiss');
    }
    if (mainExperience) {
      mainExperience.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 750);
}

// --- Pluie de Cœurs & Confettis Dorés + Carte Finale ---
const btnCelebration = document.getElementById('btnCelebration');
const celebrationModal = document.getElementById('celebrationModal');

if (btnCelebration) {
  btnCelebration.addEventListener('click', () => {
    launchGoldenHeartsRain();
    setTimeout(() => {
      if (celebrationModal) {
        celebrationModal.classList.add('active');
      }
    }, 600);
  });
}

function closeCelebrationModal(e) {
  if (e.target === celebrationModal || e.target.classList.contains('btn-close-celebration')) {
    celebrationModal.classList.remove('active');
  }
}

function launchGoldenHeartsRain() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '10005';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#E63956', '#FFB3C2', '#FFD700', '#B8223E', '#FFFFFF'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.8,
      size: Math.random() * 16 + 12,
      w: Math.random() * 10 + 6,
      h: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2.5,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      isHeart: Math.random() > 0.45,
      opacity: Math.random() * 0.4 + 0.6
    });
  }

  const startTime = Date.now();

  function renderRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y < window.innerHeight + 50) {
        active++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.isHeart) {
          ctx.font = `${p.size}px 'Caveat', serif`;
          ctx.fillText('♡', -p.size / 2, p.size / 2);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        ctx.restore();
      }
    });

    if (active > 0 && Date.now() - startTime < 4800) {
      requestAnimationFrame(renderRain);
    } else {
      canvas.remove();
    }
  }
  renderRain();
}

// --- Lightbox Plein Écran pour les Photos ---
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