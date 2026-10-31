/* ========================================================
   SCRIPT STORY MOBILE-FIRST (12 ÉCRANS) • YAYE BOY ♡
   ======================================================== */

const storyWrapper = document.getElementById('storyWrapper');
const slides = document.querySelectorAll('.slide-screen');
const totalSlides = slides.length; // 12 slides

const storyTitle = document.getElementById('storyTitle');
const storyCounter = document.getElementById('storyCounter');
const progressBarFill = document.getElementById('progressBarFill');

const btnPrevSlide = document.getElementById('btnPrevSlide');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

const bgmAudio = document.getElementById('bgmAudio');
const audioToggleBtn = document.getElementById('audioToggleBtn');

let currentSlide = 0;
let isAudioPlaying = false;
let audioContext = null;

// --- 1. Navigation entre les Slides ---
function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;

  currentSlide = index;

  // Déplacement horizontal fluide
  storyWrapper.style.transform = `translateX(-${currentSlide * 100}vw)`;

  // Mise à jour de l'en-tête et du compteur
  const targetSlide = slides[currentSlide];
  const title = targetSlide.getAttribute('data-title') || 'Yaye Boy ♡';
  storyTitle.textContent = title;
  storyCounter.textContent = `${currentSlide + 1}/${totalSlides}`;

  // Mise à jour de la barre de progression
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;
  progressBarFill.style.width = `${progressPercent}%`;

  // Pause des vidéos qui ne sont pas sur la slide active
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(v => {
    if (!targetSlide.contains(v)) {
      v.pause();
    }
  });

  // Remise en haut du scroll de la slide
  targetSlide.scrollTop = 0;
}

btnPrevSlide.addEventListener('click', () => goToSlide(currentSlide - 1));
btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));

// Navigation avec les touches du clavier sur Mac
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft') {
    goToSlide(currentSlide - 1);
  }
});

// Navigation au tap sur les côtés de l'écran UNIQUEMENT si on ne clique pas sur le contenu défilable
document.addEventListener('click', (e) => {
  // Ignorer si on clique sur un bouton, un lien, une vidéo ou dans une modale
  if (e.target.closest('button') || e.target.closest('a') || e.target.closest('video') || e.target.closest('.celebration-card') || e.target.closest('.lightbox-modal')) {
    return;
  }

  // Ne pas changer de slide si on clique/touche à l'intérieur d'une carte, d'un texte ou d'une liste (permet de scroller ou lire tranquillement)
  if (e.target.closest('.scrap-paper-notes-list') || e.target.closest('.wishes-scrap-notes-list') || e.target.closest('.letter-content-box') || e.target.closest('.letter-sheet-card') || e.target.closest('.videos-stack-vertical')) {
    return;
  }
  
  const clickX = e.clientX;
  const screenWidth = window.innerWidth;

  // Zone de clic pour changer de page : extrême droite (> 82%) ou extrême gauche (< 18%)
  if (clickX > screenWidth * 0.82) {
    goToSlide(currentSlide + 1);
  } else if (clickX < screenWidth * 0.18) {
    goToSlide(currentSlide - 1);
  }
});

// --- 2. Geste Tactile Swipe Mobile (Touch Swipe) ---
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // On vérifie que c'est bien un glissement horizontal prédominant
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
    if (deltaX < 0) {
      // Glissement vers la gauche -> slide suivante
      goToSlide(currentSlide + 1);
    } else {
      // Glissement vers la droite -> slide précédente
      goToSlide(currentSlide - 1);
    }
  }
}

// --- 3. Musique : Daniel Caesar - Get You ---
function playWarmAmbientChords() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === 'suspended') audioContext.resume();

    // Accords emblématiques Neo-Soul de "Get You" - Daniel Caesar
    const chords = [
      [82.41, 196.00, 246.94, 293.66, 369.99],  // Em9
      [110.00, 196.00, 277.18, 329.63, 369.99], // A13
      [65.41, 196.00, 246.94, 293.66, 329.63],  // Cmaj9
      [123.47, 220.00, 311.13, 392.00]          // B7(b13)
    ];
    let chordIdx = 0;

    function nextChord() {
      if (!isAudioPlaying) return;
      const now = audioContext.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle'; // Basse ronde au fond, Rhodes chaud au-dessus
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        const volume = idx === 0 ? 0.06 : 0.03;
        gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(volume, now + idx * 0.08 + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + 4.5);
      });

      if (isAudioPlaying) {
        setTimeout(nextChord, 4000);
      }
    }
    nextChord();
  } catch (e) {
    console.log("Audio non disponible", e);
  }
}

function playAudio() {
  isAudioPlaying = true;
  audioToggleBtn.classList.add('playing');

  // Si une source audio valide existe et fonctionne
  if (bgmAudio && bgmAudio.currentSrc) {
    const promise = bgmAudio.play();
    if (promise !== undefined) {
      promise.then(() => {}).catch(() => {
        playWarmAmbientChords();
      });
    }
  } else {
    // Si aucun fichier MP3 n'est déposé, jouer le synthé Neo-Soul Get You
    playWarmAmbientChords();
  }
}

function pauseAudio() {
  isAudioPlaying = false;
  audioToggleBtn.classList.remove('playing');
  bgmAudio.pause();
  if (audioContext && audioContext.state === 'running') {
    audioContext.suspend();
  }
}

audioToggleBtn.addEventListener('click', () => {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});

// Démarre la musique dès la première interaction utilisateur
document.addEventListener('click', function startOnTouch() {
  if (!isAudioPlaying) {
    playAudio();
  }
  document.removeEventListener('click', startOnTouch);
}, { once: true });

// --- 4. Pluie de Cœurs & Confettis Dorés + Carte Finale ---
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
  const count = 90;
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '10015';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colorsGold = ['#F7E096', '#D4AF37', '#FFE5A3', '#E6C280', '#FFFFFF'];
  const colorsHearts = ['#E63956', '#FF758C', '#F4A4B4', '#C4283E', '#FF3366', '#FFB3C1'];
  const items = [];

  for (let i = 0; i < count; i++) {
    const isHeart = Math.random() > 0.45;
    items.push({
      isHeart: isHeart,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 150,
      size: isHeart ? Math.random() * 14 + 12 : Math.random() * 8 + 4,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      speedY: Math.random() * 3 + 2.5,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6,
      color: isHeart 
        ? colorsHearts[Math.floor(Math.random() * colorsHearts.length)]
        : colorsGold[Math.floor(Math.random() * colorsGold.length)],
      opacity: 1
    });
  }

  const startTime = Date.now();
  function renderRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;

    items.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.02) * p.speedX;
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

// --- 5. Lightbox Plein Écran pour les Photos ---
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

// Initialisation au chargement
goToSlide(0);
