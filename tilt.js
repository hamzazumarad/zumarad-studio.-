// =========================
// PREMIUM CARD TILT
// =========================

(() => {
    const initTilt = () => {
        if (window.matchMedia("(hover: none)").matches) return;

        document.querySelectorAll(".portfolio-card, .tech-card").forEach(card => {
            if (card.dataset.tiltReady === "true") return;
            card.dataset.tiltReady = "true";

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 5;
                const rotateX = ((y / rect.height) - 0.5) * -5;

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    };

    document.addEventListener("DOMContentLoaded", initTilt, { once: true });
})();
