// ── Particle Canvas ──────────────────────────────
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(251,182,206,${p.alpha})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(236,72,153,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}

// ── Session Check ────────────────────────────────
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.replace('user-login.html');
}

resize();
initParticles();
drawParticles();
window.addEventListener('resize', () => { resize(); initParticles(); });

// ── Navbar Scroll ────────────────────────────────
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ── Smooth Scroll ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Scroll Reveal ────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Contact Form ─────────────────────────────────
const apiUrl = "https://boooa02qvd.execute-api.eu-north-1.amazonaws.com/contact";

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  const responseEl = document.getElementById("response");

  btn.textContent = "Sending…";
  btn.style.opacity = "0.7";

  const data = {
    name:    document.getElementById("name").value,
    email:   document.getElementById("email").value,
    phone:   document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  try {
    const res    = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await res.json();
    responseEl.innerHTML = "✅ " + (result.message || "Message sent! We'll be in touch soon.");
    responseEl.style.color = "#34d399";
    this.reset();
  } catch {
    responseEl.innerHTML = "❌ Error submitting. Please try again.";
    responseEl.style.color = "#f87171";
  } finally {
    btn.textContent = "Send Message 🚀";
    btn.style.opacity = "1";
  }
});
