// Mobile menu toggle
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menuToggle');
menuToggle?.addEventListener('click', () => {
  menu.classList.toggle('show');
  menuToggle.classList.toggle('open');
});

// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Load CMS-managed content
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
      img.alt = `Project ${i+1}`;
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
      { label: 'Facebook', href: site.socials.facebook || '#', aria:'Facebook' },
      { label: 'Instagram', href: site.socials.instagram || '#', aria:'Instagram' },
      { label: 'WhatsApp', href: site.socials.whatsapp || `https://wa.me/${site.contact.phone_whatsapp}`, aria:'WhatsApp' },
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

// Contact form via mailto
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
