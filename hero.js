// =========================
// HERO TILT EFFECT
// =========================

const laptop = document.querySelector(".laptop-3d");

if (laptop) {

    laptop.addEventListener("mousemove", (e) => {

        const rect = laptop.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        laptop.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    laptop.addEventListener("mouseleave", () => {

        laptop.style.transform =
            "perspective(1200px) rotateX(0) rotateY(0)";

    });

}


// =========================
// FLOATING CARDS
// =========================

const cards = document.querySelectorAll(".floating-card");

cards.forEach((card, index) => {

    card.style.animationDelay = `${index * .3}s`;

});


// =========================
// HERO ENTRANCE
// =========================

window.addEventListener("load", () => {

    document.querySelector(".hero-content")
        ?.classList.add("show");

    document.querySelector(".hero-image")
        ?.classList.add("show");

});
