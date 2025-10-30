// ===== MOBILE MENU TOGGLE =====
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
  menu.classList.toggle('show');
  menuToggle.classList.toggle('open');
});

// ===== UPDATE YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== LOAD CMS-MANAGED CONTENT =====
async function loadContent() {
  try {
    const site = await fetch('content/site.json').then(r => r.json());
    const services = await fetch('content/services.json').then(r => r.json());
    const gallery = await fetch('content/gallery.json').then(r => r.json());

    // Brand & hero
    document.getElementById('brandName').textContent = site.brand_name || 'BN Carpentry LLC';
    document.getElementById('brandNameFooter').textContent = site.brand_name || 'BN Carpentry LLC';
    document.getElementById('heroTitle').textContent = site.hero_title || '';
    document.getElementById('heroSubtitle').textContent = site.hero_subtitle || '';
    document.getElementById('aboutText').textContent = site.about_text || '';

    // Services
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';
    const items = services.items || services;
    items.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service card-sm';
      card.innerHTML = `
        <div class="icon">${s.icon || ''}</div>
        <h3>${s.title}</h3>
        <p>${s.description || ''}</p>
      `;
      grid.appendChild(card);
    });

    // Gallery
    const ggrid = document.getElementById('galleryGrid');
    ggrid.innerHTML = '';
    (gallery.images || []).forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Project ${i + 1}`;
      ggrid.appendChild(img);
    });

    // Contact & socials
    const details = document.getElementById('contactDetails');
    details.innerHTML = `
      <p><strong>Phone:</strong> <a href="tel:+1${site.contact.phone_whatsapp}">${site.contact.phone_display}</a></p>
      <p><strong>Email:</strong> <a href="mailto:${site.contact.email}">${site.contact.email}</a></p>
      <p><strong>Location:</strong> ${site.contact.location}</p>
    `;

    const socials = document.getElementById('socials');
    const footerSocials = document.getElementById('footerSocials');
    const socialLinks = [
      { label: 'Facebook', href: site.socials.facebook || '#', aria: 'Facebook' },
      { label: 'Instagram', href: site.socials.instagram || '#', aria: 'Instagram' },
      { label: 'WhatsApp', href: site.socials.whatsapp || `https://wa.me/${site.contact.phone_whatsapp}`, aria: 'WhatsApp' },
    ];
    socials.innerHTML = socialLinks.map(s => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.aria}">${s.label}</a>`).join('');
    footerSocials.innerHTML = socialLinks.map(s => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.aria}">${s.label}</a>`).join('');

    // WhatsApp floating button
    document.getElementById('whatsFab').href = `https://wa.me/${site.contact.phone_whatsapp}`;
  } catch (e) {
    console.error('Error loading content:', e);
  }
}
loadContent();

// ===== CONTACT FORM VIA MAILTO =====
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent('New Estimate Request — BN Carpentry LLC');
  const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`);
  const mailto = `mailto:bncarpentryct@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
});

// ===== HERO SLIDESHOW (com preload e correção de altura) =====
const heroImages = [
  "images/hero1.jpg",
  "images/hero2.jpg",
  "images/hero3.jpg",
  "images/hero4.jpg",
  "images/hero5.jpg",
  "images/hero6.jpg"
];

const slidesContainer = document.querySelector(".hero-slideshow");
let loaded = 0;

heroImages.forEach((src) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loaded++;
    if (loaded === heroImages.length) startSlideshow();
  };

  // 🔧 Corrige o layout antes de adicionar ao DOM
  img.style.position = "absolute";
  img.style.top = "0";
  img.style.left = "0";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.opacity = "0";
  img.style.transition = "opacity 1.5s ease-in-out";

  slidesContainer?.appendChild(img);
});

function startSlideshow() {
  const slides = document.querySelectorAll(".hero-slideshow img");
  let current = 0;

  // Fade-in inicial
  slides[current].classList.add("active", "fade-in");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active", "fade-in");
  }, 5000);
}
