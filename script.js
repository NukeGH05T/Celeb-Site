const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = ["#ff4f81", "#ffb6c1", "#ffffffaa"];

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height / 2;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 1.5 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.scale(this.size / 20, this.size / 20);

    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.bezierCurveTo(5, -15, 15, -5, 0, 10);
    ctx.bezierCurveTo(-15, -5, -5, -15, 0, -5);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.angle += this.rotationSpeed;
    if (this.y < -20) this.reset();
  }
}

const hearts = Array.from({ length: 100 }, () => new Heart());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}

animate();

// Step logic
const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const stepsContainer = document.getElementById("steps");
const intro = document.getElementById("intro");
const bgMusic = document.getElementById("bgMusic");

let currentStep = 0;

startBtn.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
  intro.style.display = "none";
  stepsContainer.style.display = "block";
  nextBtn.style.display = "inline-block";
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");

    if (currentStep === steps.length - 1) {
      nextBtn.textContent = "Celebrate";
    }
  } else {
    launchConfetti();
  }
});

function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff4f81", "#ffb6c1", "#ffffff"],
  });

  let duration = 2000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      spread: 100,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ["#ff4f81", "#ffb6c1", "#ffffff"]
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
