const start = document.getElementById("start");
const scene = document.getElementById("scene");
const flame = document.getElementById("flame");
const message = document.getElementById("message");
const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");
const artboard = document.getElementById("artboard");

// 🎶 MUSIC
const music = new Audio("assets/sounds/music.mp3");
music.loop = true;
music.volume = 0.6;

// 📐 CANVAS RESIZE (ONLY ONE SOURCE)
function resizeCanvas() {
  const rect = artboard.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ▶️ START
start.onclick = () => {
  start.style.display = "none";
  scene.classList.remove("hidden");
  music.play();
  startMic();
};

// 🎤 MIC + FLAME
function startMic() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const audio = new AudioContext();
    const mic = audio.createMediaStreamSource(stream);
    const analyser = audio.createAnalyser();
    mic.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);
    let active = true;

    function listen() {
      if (!active) return;

      analyser.getByteFrequencyData(data);
      const volume = data.reduce((a,b)=>a+b) / data.length;

      if (volume > 60 && flame) {
        flame.style.opacity -= 0.04;

        if (flame.style.opacity <= 0) {
          active = false;
          flame.remove();
          createPetals();
          showMessage();
          return;
        }
      }
      requestAnimationFrame(listen);
    }
    listen();
  });
}

// 🌸 PETALS (RELATIVE TO IMAGE)
let petals = [];

function createPetals() {
  petals = [];
  for (let i = 0; i < 120; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: -10,
      r: Math.random() * 3 + 2,
      speed: Math.random() * 1.2 + 0.6,
      sway: Math.random() * 1.5
    });
  }
  animatePetals();
}

function animatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    p.y += p.speed;
    p.x += Math.sin(p.y * 0.02) * p.sway;

    ctx.fillStyle = "rgba(255,200,220,0.85)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (petals.length > 0) {
    requestAnimationFrame(animatePetals);
  }
}

// 💖 MESSAGE
function showMessage() {
  message.innerHTML = `
    <div>
      🎉 HAPPY BIRTHDAY 🎉<br>
      <strong>MY LOVE ❤️</strong><br>
      <small>29 JAN</small>
    </div>
  `;
  message.style.opacity = 1;
  message.style.transform = "scale(1)";
}
