// =========================
// TESTIMONIAL SLIDER
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const cards =
        document.querySelectorAll(".testimonial-card");

    const prevBtn =
        document.querySelector(".testimonial-prev");

    const nextBtn =
        document.querySelector(".testimonial-next");


    // =========================
    // CHECK ELEMENTS
    // =========================

    if (!cards.length) {

        console.warn(
            "Testimonial cards not found."
        );

        return;
    }


    if (!prevBtn || !nextBtn) {

        console.warn(
            "Testimonial buttons not found."
        );

        return;
    }


    // =========================
    // STATE
    // =========================

    let currentIndex = 0;


    // =========================
    // SHOW CARD
    // =========================

    function showTestimonial(index) {


        // Loop forward

        if (index >= cards.length) {

            currentIndex = 0;

        }


        // Loop backward

        else if (index < 0) {

            currentIndex =
                cards.length - 1;

        }


        // Normal

        else {

            currentIndex = index;

        }


        // =========================
        // UPDATE CARDS
        // =========================

        cards.forEach((card, i) => {

            card.classList.remove(
                "is-active"
            );

            card.classList.remove(
                "active"
            );


            if (i === currentIndex) {

                card.classList.add(
                    "is-active"
                );

                // Keep reveal system happy

                card.classList.add(
                    "active"
                );

            }

        });


        console.log(
            `Showing testimonial ${currentIndex + 1} of ${cards.length}`
        );

    }


    // =========================
    // NEXT BUTTON
    // =========================

    nextBtn.addEventListener(
        "click",
        () => {

            showTestimonial(
                currentIndex + 1
            );

        }
    );


    // =========================
    // PREVIOUS BUTTON
    // =========================

    prevBtn.addEventListener(
        "click",
        () => {

            showTestimonial(
                currentIndex - 1
            );

        }
    );


    // =========================
    // INITIAL CARD
    // =========================

    showTestimonial(0);


});