// Remember scroll position on the home page across visits to case studies / work samples
if (document.body.id === 'home-page') {
  (function () {
    const POS_KEY = 'homeScrollY';
    const VISITED_KEY = 'homeVisited';
    if (history.scrollRestoration) history.scrollRestoration = 'manual';

    const firstVisit = !sessionStorage.getItem(VISITED_KEY);
    sessionStorage.setItem(VISITED_KEY, '1');

    if (!firstVisit) {
      const saved = sessionStorage.getItem(POS_KEY);
      if (saved !== null) {
        const y = parseInt(saved, 10);
        if (location.hash) history.replaceState(null, '', location.pathname + location.search);
        const restore = () => {
          const prevBehavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, y);
          document.documentElement.style.scrollBehavior = prevBehavior;
        };
        // Layout (images/fonts) can still be settling on first paint, so retry
        // a few times rather than trusting a single early scrollTo to stick.
        restore();
        requestAnimationFrame(restore);
        window.addEventListener('load', restore);
        setTimeout(restore, 300);
      }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(POS_KEY, String(window.scrollY));
        ticking = false;
      });
    }, { passive: true });
  })();
}

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Carousels
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.carousel-track');
  const prevBtn = wrap.querySelector('.carousel-btn.prev');
  const nextBtn = wrap.querySelector('.carousel-btn.next');
  if (!track) return;

  const scrollAmount = () => {
    const item = track.querySelector('.carousel-item');
    if (!item) return 260;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '18');
    return item.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    if (!prevBtn || !nextBtn) return;
    const max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  };

  prevBtn && prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn && nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
  track.addEventListener('scroll', () => window.requestAnimationFrame(updateButtons));
  window.addEventListener('resize', updateButtons);
  updateButtons();
});

// Galleries (work sample viewers)
document.querySelectorAll('.gallery').forEach(gallery => {
  const stageImg = gallery.querySelector('.gallery-stage img');
  const thumbs = Array.from(gallery.querySelectorAll('.gallery-thumb'));
  const counter = gallery.querySelector('.gallery-count .current');
  const prevBtn = gallery.querySelector('.gallery-nav.prev');
  const nextBtn = gallery.querySelector('.gallery-nav.next');
  if (!stageImg || !thumbs.length) return;

  let index = thumbs.findIndex(t => t.classList.contains('active'));
  if (index < 0) index = 0;

  const show = (i) => {
    index = (i + thumbs.length) % thumbs.length;
    const thumbImg = thumbs[index].querySelector('img');
    stageImg.src = thumbs[index].dataset.full || thumbImg.src;
    stageImg.alt = thumbImg.alt;
    thumbs.forEach(t => t.classList.remove('active'));
    thumbs[index].classList.add('active');
    if (counter) counter.textContent = index + 1;
    thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  prevBtn && prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(index + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  show(index);
});
