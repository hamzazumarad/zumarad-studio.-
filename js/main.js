// =========================
// MAIN SITE UTILITIES
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress-bar");

    if (progressBar) {
        const updateProgress = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();
    }
});
