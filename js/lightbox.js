// =========================
// PORTFOLIO LIGHTBOX
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const lightbox =
        document.getElementById("portfolioLightbox");

    const image =
        lightbox?.querySelector(".lightbox-image");

    const closeButton =
        lightbox?.querySelector(".lightbox-close");

    if (!lightbox || !image || !closeButton) {
        return;
    }

    // =========================
    // CLOSE LIGHTBOX
    // =========================

    const close = () => {

        lightbox.classList.remove("active");

        document.body.classList.remove(
            "lightbox-open"
        );

        image.removeAttribute("src");

        image.removeAttribute("alt");
    };

    // =========================
    // OPEN LIGHTBOX
    // =========================

    const open = (src, alt) => {

        if (!src) return;

        image.src = src;

        image.alt =
            alt || "Portfolio Preview";

        lightbox.classList.add("active");

        document.body.classList.add(
            "lightbox-open"
        );
    };

    // =========================
    // PORTFOLIO PREVIEW CLICK
    // =========================

    document.addEventListener("click", (event) => {

        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const preview =
            target.closest(
                ".portfolio-preview, .portfolio-preview-btn"
            );

        if (preview) {

            const src =
                preview.dataset.image ||
                preview.getAttribute("src") ||
                "";

            const alt =
                preview.dataset.title ||
                preview.getAttribute("alt") ||
                "Portfolio Preview";

            if (src) {
                open(src, alt);
            }

            return;
        }

        // =========================
        // CLOSE BUTTON
        // =========================

        if (
            target.closest(".lightbox-close")
        ) {
            close();
            return;
        }

        // =========================
        // OVERLAY CLICK
        // =========================

        if (target === lightbox) {
            close();
        }

    });

    // =========================
    // ESCAPE KEY
    // =========================

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {
            close();
        }

    });

});