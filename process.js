document.addEventListener("DOMContentLoaded", () => {

    const processCards = document.querySelectorAll(".process-card");

    if (!processCards.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });
        },
        {
            threshold: 0.15
        }
    );

    processCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.12}s`;

        observer.observe(card);

    });

});