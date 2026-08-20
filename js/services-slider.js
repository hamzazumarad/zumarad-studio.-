/* =========================================
   ZUMARAD STUDIO — SERVICES SLIDER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".services-grid");
    const cards = document.querySelectorAll(".service-card");
    const dots = document.querySelectorAll(".service-dot");

    const prevBtn = document.querySelector(".services-prev");
    const nextBtn = document.querySelector(".services-next");

    if (!slider || !cards.length) {
        console.warn("Services slider not found.");
        return;
    }

    /* =====================================
       UPDATE ACTIVE DOT
    ===================================== */

    function updateActiveDot(index) {

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });

    }

    /* =====================================
       DETECT CURRENT CARD
    ===================================== */

    function getCurrentCardIndex() {

        const scrollLeft = slider.scrollLeft;

        let closestIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach((card, index) => {

            const distance = Math.abs(
                card.offsetLeft -
                slider.offsetLeft -
                scrollLeft
            );

            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }

        });

        return closestIndex;
    }

    /* =====================================
       GO TO CARD
    ===================================== */

    function goToCard(index) {

        if (index < 0) {
            index = cards.length - 1;
        }

        if (index >= cards.length) {
            index = 0;
        }

        const card = cards[index];

        slider.scrollTo({
            left: card.offsetLeft - slider.offsetLeft,
            behavior: "smooth"
        });

        updateActiveDot(index);
    }

    /* =====================================
       NEXT
    ===================================== */

    nextBtn?.addEventListener("click", () => {

        const current = getCurrentCardIndex();

        goToCard(current + 1);

    });

    /* =====================================
       PREVIOUS
    ===================================== */

    prevBtn?.addEventListener("click", () => {

        const current = getCurrentCardIndex();

        goToCard(current - 1);

    });

    /* =====================================
       DOT CLICK
    ===================================== */

    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            const index = Number(dot.dataset.index);

            if (!Number.isNaN(index)) {
                goToCard(index);
            }

        });

    });

    /* =====================================
       UPDATE DOT WHEN USER SWIPES
    ===================================== */

    let scrollTimer;

    slider.addEventListener("scroll", () => {

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {

            const index = getCurrentCardIndex();

            updateActiveDot(index);

        }, 80);

    });

    /* =====================================
       INITIAL STATE
    ===================================== */

    updateActiveDot(0);

    console.log(
        "Services slider loaded:",
        cards.length,
        "cards"
    );

});