// =========================
// PREMIUM PAGE LOADER
// =========================

(() => {
    "use strict";

    const loader = document.getElementById("loader");

    if (!loader) return;

    let hidden = false;

    function hideLoader() {
        if (hidden) return;

        hidden = true;

        loader.classList.add("loader-hide");

        // Remove loader from accessibility tree
        loader.setAttribute("aria-hidden", "true");

        // Completely remove it after fade animation
        window.setTimeout(() => {
            loader.remove();
        }, 650);
    }

    // Wait for page load, but don't unnecessarily delay the user
    window.addEventListener(
        "load",
        () => {
            window.setTimeout(hideLoader, 650);
        },
        { once: true }
    );

    // Fail-safe:
    // Loader can NEVER trap the user for too long.
    window.setTimeout(hideLoader, 2500);

})();