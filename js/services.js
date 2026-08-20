// =========================
// SERVICES REVEAL
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".service-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });
});
