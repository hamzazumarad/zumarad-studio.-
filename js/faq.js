// =========================
// FAQ ACCORDION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) {
        console.warn("FAQ items not found.");
        return;
    }

    faqItems.forEach(item => {

        const button =
            item.querySelector(".faq-question");

        if (!button) return;

        button.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherButton =
                    otherItem.querySelector(".faq-question");

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

            // Open clicked FAQ
            if (!isOpen) {

                item.classList.add("active");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

    console.log(
        `FAQ accordion loaded: ${faqItems.length} questions`
    );

});