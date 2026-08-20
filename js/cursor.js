// =========================
// CUSTOM CURSOR + COUNTERS
// =========================

const cursor = document.querySelector(".cursor");

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll("a, button").forEach((item) => {
        item.addEventListener("mouseenter", () => cursor.classList.add("active"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("active"));
    });
}

document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let value = 0;
    const update = () => {
        value += Math.max(1, Math.ceil(target / 80));
        if (value < target) {
            counter.innerText = value;
            requestAnimationFrame(update);
        } else {
            counter.innerText = `${target}+`;
        }
    };
    update();
});
