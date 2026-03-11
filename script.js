function initPage() {
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    return;
  }

  const isInView = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach((element) => {
    if (isInView(element)) {
      element.classList.add('visible');
      return;
    }

    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage, { once: true });
} else {
  initPage();
}
