/**
 * MR.BASS — Hero Motion, Parallax & Dual-Theme Controller
 * White / Black Background Switcher, Lerp Physics & Interactive Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle References
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleLabel = document.getElementById('themeToggleLabel');
  const root = document.documentElement;

  // Initialize Theme from localStorage or Default to Dark
  const savedTheme = localStorage.getItem('mrbass_theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleLabel) {
      themeToggleLabel.textContent = theme === 'light' ? 'LIGHT' : 'DARK';
    }
    localStorage.setItem('mrbass_theme', theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Layer References
  const auraGold = document.getElementById('auraGold');
  const auraBlue = document.getElementById('auraBlue');
  const portraitWrap = document.getElementById('portraitWrap');
  const portraitImg = document.getElementById('heroPortraitImg');
  const mindCard = document.getElementById('mindCard');
  const spotlight = document.querySelector('.ambient-spotlight');

  // Portrait Switcher Pill
  const portraitSwitchPill = document.getElementById('portraitSwitchPill');
  const portraitLabel = document.getElementById('portraitLabel');

  // Modal Drawers
  const connectDrawer = document.getElementById('connectDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const openConnectBtns = document.querySelectorAll('.open-connect-modal');

  const worldDrawer = document.getElementById('worldDrawer');
  const worldCloseBtn = document.getElementById('worldCloseBtn');
  const exploreBtn = document.getElementById('exploreBtn');
  const scrollTrigger = document.getElementById('scrollTrigger');

  // Ensure portrait is guaranteed visible immediately
  if (portraitImg) {
    portraitImg.style.display = 'block';
    portraitImg.style.opacity = '1';
    portraitImg.style.visibility = 'visible';
  }

  // Device & accessibility checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

  // Parallax layers (desktop only to preserve mobile performance)
  const layers = [
    { el: auraGold, factorX: 0.015, factorY: 0.015 },
    { el: auraBlue, factorX: -0.012, factorY: -0.012 },
    { el: portraitWrap, factorX: 0.012, factorY: 0.012, rotFactor: 0.008 }
  ];

  // Mouse & Target Coordinates
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  let isMouseActive = false;

  window.addEventListener('resize', () => {
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
  });

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      isMouseActive = true;
      target.x = e.clientX;
      target.y = e.clientY;
    });

    // Lerp Animation Loop (Smooth 60/120fps Depth on Desktop)
    function render() {
      if (!prefersReducedMotion && isMouseActive) {
        mouse.x += (target.x - mouse.x) * 0.06;
        mouse.y += (target.y - mouse.y) * 0.06;

        if (spotlight) {
          spotlight.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
        }

        const deltaX = mouse.x - centerX;
        const deltaY = mouse.y - centerY;

        layers.forEach((layer) => {
          if (!layer.el) return;
          const moveX = deltaX * layer.factorX;
          const moveY = deltaY * layer.factorY;

          if (layer.rotFactor) {
            const rotY = deltaX * layer.rotFactor;
            const rotX = -deltaY * layer.rotFactor;
            layer.el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
          } else {
            layer.el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
          }
        });
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  // Entrance Choreography with GSAP
  function runEntrance() {
    if (window.gsap && !prefersReducedMotion) {
      try {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

        tl.from('.site-header', { y: -20, opacity: 0.2, duration: 0.7 })
          .from('.eyebrow-text', { y: 15, opacity: 0.2, duration: 0.5 }, '-=0.4')
          .from('.headline-title .headline-row', {
            y: 25,
            opacity: 0.2,
            stagger: 0.1,
            duration: 0.7
          }, '-=0.3')
          .from('.portrait-wrap', {
            scale: 0.96,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.5')
          .from('.hero-bio-text', { y: 15, opacity: 0.3, duration: 0.5 }, '-=0.4')
          .from('.hero-actions-row', { y: 12, opacity: 0.3, duration: 0.5 }, '-=0.3')
          .from('.hero-footer', { y: 10, opacity: 0.3, duration: 0.5 }, '-=0.3');
      } catch (err) {
        console.warn('GSAP animation skipped:', err);
      }
    }
  }

  // Portrait Switcher Pill Logic
  const portraits = [
    {
      src: 'asset/portrait.png',
      name: 'Creative Visionary'
    },
    {
      src: 'asset/portrait-alt.png',
      name: 'Futuristic Developer'
    }
  ];
  let currentIdx = 0;

  if (portraitSwitchPill && portraitImg) {
    portraitSwitchPill.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % portraits.length;
      const next = portraits[currentIdx];

      portraitImg.style.transition = 'opacity 0.25s ease';
      portraitImg.style.opacity = '0.2';

      setTimeout(() => {
        portraitImg.src = next.src;
        portraitImg.alt = `MR.BASS — ${next.name}`;
        if (portraitLabel) portraitLabel.textContent = next.name;
        portraitImg.style.opacity = '1';
      }, 200);
    });
  }

  // Connect Modal Logic
  function openConnect() {
    if (connectDrawer) {
      connectDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeConnect() {
    if (connectDrawer) {
      connectDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openConnectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href === '#connect') {
        const connectSec = document.getElementById('connect');
        if (connectSec) {
          e.preventDefault();
          connectSec.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      e.preventDefault();
      openConnect();
    });
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeConnect);
  }

  if (connectDrawer) {
    connectDrawer.addEventListener('click', (e) => {
      if (e.target === connectDrawer) closeConnect();
    });
  }

  // World Showcase Modal Logic
  function openWorld() {
    if (worldDrawer) {
      worldDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeWorld() {
    if (worldDrawer) {
      worldDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWorld();
    });
  }

  if (worldCloseBtn) {
    worldCloseBtn.addEventListener('click', closeWorld);
  }

  if (worldDrawer) {
    worldDrawer.addEventListener('click', (e) => {
      if (e.target === worldDrawer) closeWorld();
    });
  }

  if (scrollTrigger) {
    scrollTrigger.addEventListener('click', () => {
      const mindSection = document.getElementById('mind');
      if (mindSection) {
        mindSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        openWorld();
      }
    });
  }

  // Intersection Observer for Process Timeline Stages
  const stageNodes = document.querySelectorAll('.process-stage-node');
  if ('IntersectionObserver' in window && stageNodes.length > 0) {
    const stageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    stageNodes.forEach((node) => stageObserver.observe(node));
  }

  // 3D Perspective Tilt on Capability & Tool Cards (Desktop Only)
  if (!isTouchDevice && !prefersReducedMotion) {
    const tiltCards = document.querySelectorAll('.capability-card, .tech-badge-card, .ai-tool-card, .ai-step-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 8;
        const rotY = (x / rect.width) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // In-Page Scroll-Reveal Observer for Mobile & Desktop Bento Cards
  const revealCards = document.querySelectorAll(
    '.capability-card, .process-stage-node, .tech-badge-card, .ai-tool-card, .ai-step-card'
  );

  if ('IntersectionObserver' in window && revealCards.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, unobserve to free resources
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealCards.forEach((card) => revealObserver.observe(card));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealCards.forEach((card) => card.classList.add('is-visible'));
  }

  // Mobile Touch Micro-Interactions on Tech Cards
  const techCards = document.querySelectorAll('.tech-badge-card');
  techCards.forEach((card) => {
    card.addEventListener('touchstart', () => {
      card.classList.add('touch-active');
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('touch-active'), 300);
    }, { passive: true });
  });

  // =========================================================================
  // Section 02: Interactive 3D Cross Stack Controller for Capabilities
  // Displays cards in visible criss-cross fanned stack; click/tap reveals one by one continuously
  // =========================================================================
  const capContainer = document.querySelector('.capabilities-grid');
  const capCards = capContainer ? Array.from(capContainer.querySelectorAll('.capability-card')) : [];
  const deckCurrentNum = document.getElementById('deckCurrentNum');
  const deckBars = document.querySelectorAll('.deck-bar');
  const deckNextBtn = document.getElementById('deckNextBtn');
  const capDeckBar = document.getElementById('capabilitiesDeckBar');
  const modeToggleBtns = document.querySelectorAll('.mode-toggle-btn');

  if (capCards.length > 0) {
    let activeIndex = 0;
    let isTransitioning = false;

    function isStackMode() {
      return capContainer && capContainer.classList.contains('cross-stack-mode');
    }

    function updateDeckPositions() {
      if (!isStackMode()) {
        capCards.forEach((card) => {
          card.removeAttribute('data-stack-pos');
          card.classList.remove('is-dismissing');
        });
        if (capContainer) capContainer.style.minHeight = '';
        if (capDeckBar) capDeckBar.style.display = 'none';
        return;
      }

      if (capDeckBar) capDeckBar.style.display = 'flex';

      capCards.forEach((card, idx) => {
        // Relative offset from activeIndex (0 = front straight, 1 = right, 2 = left, 3 = far right)
        const relPos = (idx - activeIndex + capCards.length) % capCards.length;
        card.setAttribute('data-stack-pos', relPos.toString());
      });

      if (deckCurrentNum) {
        deckCurrentNum.textContent = String(activeIndex + 1).padStart(2, '0');
      }
      deckBars.forEach((bar, idx) => {
        bar.classList.toggle('active', idx === activeIndex);
      });

      // Adjust container height dynamically to fit the card content + top cross offset
      const activeCard = capCards[activeIndex];
      if (activeCard && capContainer) {
        requestAnimationFrame(() => {
          const height = activeCard.offsetHeight;
          if (height > 0) {
            capContainer.style.minHeight = (height + 110) + 'px';
          }
        });
      }
    }

    function advanceDeck() {
      if (isTransitioning || !isStackMode()) return;
      isTransitioning = true;

      const currentCard = capCards[activeIndex];
      currentCard.classList.add('is-dismissing');

      // Continuous loop
      activeIndex = (activeIndex + 1) % capCards.length;

      // Advance cards behind forward
      capCards.forEach((card, idx) => {
        if (card !== currentCard) {
          const relPos = (idx - activeIndex + capCards.length) % capCards.length;
          card.setAttribute('data-stack-pos', relPos.toString());
        }
      });

      if (deckCurrentNum) {
        deckCurrentNum.textContent = String(activeIndex + 1).padStart(2, '0');
      }
      deckBars.forEach((bar, idx) => {
        bar.classList.toggle('active', idx === activeIndex);
      });

      const nextCard = capCards[activeIndex];
      if (nextCard && capContainer) {
        const height = nextCard.offsetHeight;
        if (height > 0) {
          capContainer.style.minHeight = (height + 110) + 'px';
        }
      }

      setTimeout(() => {
        currentCard.classList.remove('is-dismissing');
        currentCard.setAttribute('data-stack-pos', String(capCards.length - 1));
        isTransitioning = false;
      }, 360);
    }

    // Click/tap on front active card advances the stack
    capCards.forEach((card) => {
      card.addEventListener('click', () => {
        if (isStackMode() && card.getAttribute('data-stack-pos') === '0') {
          advanceDeck();
        }
      });
    });

    // Tap action button
    if (deckNextBtn) {
      deckNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        advanceDeck();
      });
    }

    // Indicator bars jump
    deckBars.forEach((bar, idx) => {
      bar.addEventListener('click', (e) => {
        e.preventDefault();
        if (isStackMode() && idx !== activeIndex && !isTransitioning) {
          activeIndex = idx;
          updateDeckPositions();
        }
      });
    });

    // Mode Toggle (Cross Stack vs Full Grid)
    modeToggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        modeToggleBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (mode === 'stack') {
          capContainer.classList.add('cross-stack-mode');
          updateDeckPositions();
        } else {
          capContainer.classList.remove('cross-stack-mode');
          updateDeckPositions();
        }
      });
    });

    // Touch swipe support (swipe across / left / up)
    let touchStartX = 0;
    let touchStartY = 0;
    if (capContainer) {
      capContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      capContainer.addEventListener('touchend', (e) => {
        if (e.changedTouches.length === 1 && isStackMode()) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          const deltaY = e.changedTouches[0].clientY - touchStartY;
          if (deltaX < -40 || (deltaY < -40 && Math.abs(deltaX) < 60)) {
            advanceDeck();
          }
        }
      }, { passive: true });
    }

    // Initialize cross stack view
    updateDeckPositions();

    // Re-evaluate on resize
    let deckResizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(deckResizeTimer);
      deckResizeTimer = setTimeout(updateDeckPositions, 150);
    });
  }

  // Escape key handler
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConnect();
      closeWorld();
    }
  });

  // =========================================================================
  // Section 05: LET'S CONNECT — Interactive Form Controller & Validation
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const statusFeedback = document.getElementById('formStatusFeedback');

  const fields = {
    name: {
      input: document.getElementById('contactName'),
      group: document.getElementById('group-name'),
      error: document.getElementById('nameError'),
      validate: (val) => {
        if (!val || val.trim().length < 2) {
          return 'Please enter your name (at least 2 characters).';
        }
        return '';
      }
    },
    email: {
      input: document.getElementById('contactEmail'),
      group: document.getElementById('group-email'),
      error: document.getElementById('emailError'),
      validate: (val) => {
        if (!val || !val.trim()) {
          return 'Email address is required.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(val.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      }
    },
    subject: {
      input: document.getElementById('contactSubject'),
      group: document.getElementById('group-subject'),
      error: document.getElementById('subjectError'),
      validate: (val) => {
        if (!val || !val.trim()) {
          return 'Please select what you are looking for.';
        }
        return '';
      }
    },
    message: {
      input: document.getElementById('contactMessage'),
      group: document.getElementById('group-message'),
      error: document.getElementById('messageError'),
      validate: (val) => {
        if (!val || val.trim().length < 10) {
          return 'Please share a brief summary of your idea (at least 10 characters).';
        }
        return '';
      }
    }
  };

  // Real-time clearance of error states on input/change
  Object.keys(fields).forEach((key) => {
    const item = fields[key];
    if (item.input) {
      const clearErr = () => {
        if (item.group && item.group.classList.contains('has-error')) {
          item.group.classList.remove('has-error');
          if (item.error) item.error.textContent = '';
        }
      };
      item.input.addEventListener('input', clearErr);
      item.input.addEventListener('change', clearErr);
    }
  });

  if (contactForm && submitBtn) {
    let isSubmitting = false;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isSubmitting) return; // Prevent accidental multiple submissions

      // Validate all fields
      let hasError = false;
      let firstInvalidInput = null;

      Object.keys(fields).forEach((key) => {
        const item = fields[key];
        if (!item.input) return;

        const errorMsg = item.validate(item.input.value);
        if (errorMsg) {
          hasError = true;
          if (item.group) item.group.classList.add('has-error');
          if (item.error) item.error.textContent = errorMsg;
          if (!firstInvalidInput) firstInvalidInput = item.input;
        } else {
          if (item.group) item.group.classList.remove('has-error');
          if (item.error) item.error.textContent = '';
        }
      });

      if (hasError) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      // Enter loading state
      isSubmitting = true;
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      const btnLabel = submitBtn.querySelector('.btn-label');
      const originalLabel = btnLabel ? btnLabel.textContent : 'Send Message';
      if (btnLabel) btnLabel.textContent = 'Sending Message...';

      if (statusFeedback) {
        statusFeedback.className = 'form-status-feedback';
        statusFeedback.innerHTML = '';
      }

      const formData = {
        name: fields.name.input.value.trim(),
        email: fields.email.input.value.trim(),
        subject: fields.subject.input.value.trim(),
        message: fields.message.input.value.trim()
      };

      // Check if backend submission endpoint exists
      const formAction = contactForm.getAttribute('action');
      const hasLiveBackend = formAction && formAction !== '#' && formAction !== '';

      try {
        if (hasLiveBackend) {
          // Attempt POST to live backend endpoint
          const response = await fetch(formAction, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
          });

          if (!response.ok) {
            throw new Error(`Server returned HTTP ${response.status}`);
          }

          // Submission successful
          if (statusFeedback) {
            statusFeedback.innerHTML = `
              <div class="status-card status-success">
                <div class="status-header-row">
                  <span>✓</span>
                  <span>Message Sent Successfully</span>
                </div>
                <p>Thank you, ${escapeHtml(formData.name)}! Your message has been received. I'll get back to you promptly at ${escapeHtml(formData.email)}.</p>
              </div>
            `;
            statusFeedback.classList.add('is-visible');
          }
          contactForm.reset();
        } else {
          // No submission backend configured yet
          // Gracefully inform user and provide immediate direct action buttons with pre-filled content
          await new Promise((resolve) => setTimeout(resolve, 600)); // Smooth cinematic transition

          const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.subject} - ${formData.name}`);
          const mailtoBody = encodeURIComponent(`Hi Baskar,\n\nName: ${formData.name}\nEmail: ${formData.email}\nObjective: ${formData.subject}\n\nIdea / Challenge:\n${formData.message}`);
          const whatsappText = encodeURIComponent(`Hi Baskar, I'm ${formData.name} (${formData.email}). I'm reaching out regarding "${formData.subject}":\n\n${formData.message}`);

          if (statusFeedback) {
            statusFeedback.innerHTML = `
              <div class="status-card status-notice">
                <div class="status-header-row">
                  <span>✦</span>
                  <span>Ready to Connect</span>
                </div>
                <p>Contact gateway is being connected. Send your message directly to Baskar with your details pre-filled:</p>
                <div class="status-actions-row">
                  <a href="mailto:baskar.techdev@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" class="btn-fallback-action">
                    ✉ Send via Email Client &rarr;
                  </a>
                  <a href="https://wa.me/919629624692?text=${whatsappText}" target="_blank" rel="noopener noreferrer" class="btn-fallback-action">
                    💬 Send via WhatsApp &rarr;
                  </a>
                </div>
              </div>
            `;
            statusFeedback.classList.add('is-visible');
          }
        }
      } catch (err) {
        // Proper error state
        if (statusFeedback) {
          const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.subject} - ${formData.name}`);
          const mailtoBody = encodeURIComponent(`Hi Baskar,\n\nName: ${formData.name}\nEmail: ${formData.email}\nObjective: ${formData.subject}\n\nIdea / Challenge:\n${formData.message}`);
          
          statusFeedback.innerHTML = `
            <div class="status-card status-error">
              <div class="status-header-row">
                <span>⚠</span>
                <span>Submission Error</span>
              </div>
              <p>Could not send through the automated gateway (${escapeHtml(err.message || 'Network error')}). You can send your message directly:</p>
              <div class="status-actions-row">
                <a href="mailto:baskar.techdev@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" class="btn-fallback-action">
                  ✉ Send via Email Client &rarr;
                </a>
              </div>
            </div>
          `;
          statusFeedback.classList.add('is-visible');
        }
      } finally {
        isSubmitting = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        if (btnLabel) btnLabel.textContent = originalLabel;
      }
    });
  }

  // Helper function to escape HTML entities
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[m]);
  }

  // Compact Footer — Back to Top & Dynamic Copyright Year
  const sigBackToTopBtn = document.getElementById('sigBackToTopBtn');
  if (sigBackToTopBtn) {
    sigBackToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const sigYear = document.getElementById('sigYear');
  if (sigYear) {
    sigYear.textContent = new Date().getFullYear();
  }

  // Run entrance animation
  setTimeout(runEntrance, 100);
});
