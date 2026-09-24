const cover = document.getElementById('cover');
const invite = document.getElementById('invite');
const btn = document.getElementById('openInvite');
const audio = document.getElementById('weddingAudio');
const confetti = document.getElementById('confetti');

function buildConfetti() {
  const colors = ['#f7c85d', '#ffffff', '#d91f45', '#48b7a8', '#ff8c42'];
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('i');
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.setProperty('--c', colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty('--d', (4 + Math.random() * 5) + 's');
    piece.style.setProperty('--delay', (-Math.random() * 8) + 's');
    piece.style.setProperty('--x', (-80 + Math.random() * 160) + 'px');
    piece.style.setProperty('--r', (Math.random() * 180) + 'deg');
    piece.style.borderRadius = Math.random() > .55 ? '50%' : '2px';
    confetti.appendChild(piece);
  }
}

btn.addEventListener('click', async () => {
  btn.disabled = true;
  try {
    audio.volume = 1;
    await audio.play();
  } catch (err) {
    console.log('Audio playback was blocked by the browser:', err);
  }

  cover.animate([
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(1.08) rotate(1deg)' }
  ], { duration: 520, easing: 'ease-in', fill: 'forwards' });

  setTimeout(() => {
    cover.classList.remove('active');
    invite.classList.add('active');
    invite.setAttribute('aria-hidden', 'false');
    document.body.classList.add('opened');
    buildConfetti();
  }, 480);
});

// Always return to the opening screen after a refresh.
window.addEventListener('pageshow', () => {
  audio.pause();
  audio.currentTime = 0;
  cover.classList.add('active');
  invite.classList.remove('active');
  invite.setAttribute('aria-hidden', 'true');
  btn.disabled = false;
});
