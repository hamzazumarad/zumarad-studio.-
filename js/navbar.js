// =========================
// NAVBAR
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const header = document.getElementById("header");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

function closeMenu() {
    navLinks?.classList.remove("active");
    menuBtn?.classList.remove("active");
    document.body.classList.remove("menu-open");
}

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuBtn.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });
}

navItems.forEach(link => link.addEventListener("click", closeMenu));

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("sticky", window.scrollY > 50);
    }, { passive: true });
}

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });

    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}, { passive: true });

closeMenu();
