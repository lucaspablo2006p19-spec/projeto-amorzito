// ELEMENTOS
const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("screen-intro");
const love = document.getElementById("screen-love");
const letterEl = document.getElementById("letter");

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const carouselTop = document.getElementById("carouselTop");
const carouselBottom = document.getElementById("carouselBottom");

// TEXTO
const text = `
Oii, meu amor… Feliz 11 meses! 💖
Eu quis criar esse cantinho
pra guardar memórias que brilham
do mesmo jeito que você brilha
na minha vida.
Apesar de tudo, a gente tá aqui, com um amor que é mais forte do que qualquer tempestade, ou deveria ser.
Eu amo você, e tô aqui pra ficar, pra construir um futuro juntos e pra te fazer feliz, do jeitinho que você merece. Quero ser o melhor que eu poderia ser p você e te fazer feliz da maneira que merece, me perdoe se eu não tiver sido, mas saiba que tô me esforçando pra ser o melhor pra você, porque você merece o melhor, e eu quero ser esse melhor pra você.
Obrigado por ser minha namorada, minha melhor amiga, minha parceira de vida e a pessoa que eu posso confiar de olhos fechados.
Eu te amo mais do que palavras podem expressar, e tô ansioso pra passar muitos momentos incríveis ao seu lado.
Com todo meu amor,
Lucas;
`;

// FOTOS
const photos = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.jpg",
  "photos/4.jpg",
  "photos/5.jpg",
  "photos/6.jpg",
  "photos/7.jpg",
  "photos/8.jpg",
  "photos/9.jpg",
  "photos/10.jpg",
];

// CLIQUE INICIAL
startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");

  setTimeout(() => {
    love.classList.remove("hidden");
    typeWriter();
    resizeCanvas();
    createStars();
    buildCarousels();
  }, 1200);
});

// TEXTO DIGITANDO
let index = 0;
function typeWriter() {
  const interval = setInterval(() => {
    letterEl.textContent += text[index];
    index++;
    if (index >= text.length) clearInterval(interval);
  }, 45);
}

// CARROSSEL
function buildCarousels() {
  [...photos, ...photos].forEach(src => {
    const imgTop = document.createElement("img");
    imgTop.src = src;
    carouselTop.appendChild(imgTop);

    const imgBottom = document.createElement("img");
    imgBottom.src = src;
    carouselBottom.appendChild(imgBottom);
  });
}

// ================================
// ✨ ESTRELAS NEON (CANVAS)
// ================================
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];
  const count = Math.min(120, Math.floor(window.innerWidth / 10));

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      glow: Math.random() * 8 + 6,
      speedY: Math.random() * 0.15 + 0.05,
      pulse: Math.random() * 0.02 + 0.005
    });
  }

  animateStars();
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    // movimento suave
    star.y += star.speedY;
    if (star.y > canvas.height) {
      star.y = -10;
      star.x = Math.random() * canvas.width;
    }

    // pulsação (brilho vivo)
    star.alpha += star.pulse;
    if (star.alpha <= 0.2 || star.alpha >= 1) {
      star.pulse *= -1;
    }

    drawStar(star);
  });

  requestAnimationFrame(animateStars);
}

function drawStar(star) {
  const gradient = ctx.createRadialGradient(
    star.x,
    star.y,
    0,
    star.x,
    star.y,
    star.glow
  );

  gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
  gradient.addColorStop(0.4, `rgba(255, 200, 240, ${star.alpha * 0.6})`);
  gradient.addColorStop(1, "rgba(255, 200, 240, 0)");

  ctx.beginPath();
  ctx.arc(star.x, star.y, star.glow, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
}