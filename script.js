// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(open));
    });
    // Close on link tap (mobile)
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        if (getComputedStyle(navToggle).display !== 'none') {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));
}

// Smooth scroll for hash links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
    }
});

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// ----- Contact form -> show toast instead of alert -----
function handleContactSubmit(e) {
    e.preventDefault();
    // TODO: send your form with fetch/Formspree/etc. here if needed

    showToast("Thanks! I’ll reply shortly.");
}

// Toast helpers
let toastTimer;
function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    const closeBtn = toast.querySelector('.toast-close');


    if (!toast || !msg) return;

    msg.textContent = message;

    // Clear any existing timers and show
    clearTimeout(toastTimer);
    toast.classList.add('show');

    // Auto-hide
    toastTimer = setTimeout(hideToast, duration);

    // Close button & ESC support
    closeBtn.onclick = hideToast;
    document.addEventListener('keydown', escToCloseToast);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.remove('show');
    document.removeEventListener('keydown', escToCloseToast);
}

function escToCloseToast(e) {
    if (e.key === 'Escape') hideToast();
}


document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
