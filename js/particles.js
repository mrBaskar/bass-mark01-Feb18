/**
 * MR.BASS — Ambient Particle Engine
 * Subtle Golden & Electric Blue Stardust with Fluid Physics
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 65;
    this.mouse = { x: -1000, y: -1000, radius: 140 };
    this.isRunning = true;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Adjust particle count for mobile
    const count = this.width < 768 ? 30 : this.maxParticles;

    for (let i = 0; i < count; i++) {
      const isGold = Math.random() > 0.45;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: Math.random() * this.width,
        originY: Math.random() * this.height,
        isGold: isGold,
        size: Math.random() * 2.2 + 0.6,
        color: isGold ? 'rgba(245, 192, 66, ' : 'rgba(0, 229, 255, ',
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // gentle upward drift
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = Date.now() * 0.001;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Natural floating movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Mouse repulsion / interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 1.5;
        p.x -= (dx / dist) * force * 3;
        p.y -= (dy / dist) * force * 3;
      }

      // Dynamic theme adaptation
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const particleBaseColor = p.isGold
        ? (isLight ? 'rgba(217, 119, 6, ' : 'rgba(245, 192, 66, ')
        : (isLight ? 'rgba(14, 116, 144, ' : 'rgba(0, 229, 255, ');

      // Shimmer / pulsing alpha
      p.alpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.2;
      const currentAlpha = Math.max(0.1, Math.min(0.85, isLight ? p.alpha * 1.3 : p.alpha));

      // Draw particle with glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${particleBaseColor}${currentAlpha})`;
      this.ctx.shadowBlur = p.size * (isLight ? 3 : 5);
      this.ctx.shadowColor = `${particleBaseColor}${isLight ? '0.4)' : '0.8)'}`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.particleEngine = new ParticleEngine('heroCanvas');
});
