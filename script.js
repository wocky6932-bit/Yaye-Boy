/* ========================================================
   LOGIQUE INTERACTIVE INSPIRÉE DU CODE REACT
   Pour Yaye Boy ♡ • Mactar
   ======================================================== */

let isOpened = false;

function openLetter() {
  if (isOpened) return;
  isOpened = true;

  const envelope = document.getElementById('envelopeInteractive');
  const siteContent = document.getElementById('siteContent');

  if (envelope) {
    envelope.parentElement.classList.add('is-opening');
  }

  // Animation d'ouverture et défilement fluide vers le héro
  document.body.classList.add('letter-opened');
  
  setTimeout(() => {
    if (siteContent) {
      siteContent.classList.add('visible');
    }
    const birthdaySection = document.getElementById('birthday');
    if (birthdaySection) {
      birthdaySection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 750);
}

function triggerKiss() {
  const kissReveal = document.getElementById('kissReveal');
  const kissButton = document.getElementById('kissButton');

  if (kissReveal) {
    kissReveal.style.display = 'block';
  }
  if (kissButton) {
    kissButton.style.display = 'none';
  }

  // Lancement de la pluie de cœurs festive
  launchHeartsExplosion();
}

function launchHeartsExplosion() {
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
  const colors = ['#C93B52', '#E63956', '#FFB3C2', '#FFD700', '#FFFFFF'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() * 80 - 40),
      y: canvas.height * 0.7,
      size: Math.random() * 18 + 14,
      w: Math.random() * 10 + 6,
      h: Math.random() * 8 + 4,
      speedY: -(Math.random() * 10 + 6),
      speedX: Math.random() * 8 - 4,
      gravity: 0.28,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 6 - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      isHeart: Math.random() > 0.35,
      opacity: 1
    });
  }

  const startTime = Date.now();

  function renderExplosion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;

    particles.forEach(p => {
      p.speedY += p.gravity;
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
          ctx.fillText('♥', -p.size / 2, p.size / 2);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        ctx.restore();
      }
    });

    if (active > 0 && Date.now() - startTime < 4200) {
      requestAnimationFrame(renderExplosion);
    } else {
      canvas.remove();
    }
  }
  renderExplosion();
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