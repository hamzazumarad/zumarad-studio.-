// =========================
// DATA-DRIVEN PORTFOLIO
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const portfolioGrid = document.querySelector(".portfolio-grid");

    if (!portfolioGrid) return;

    if (
        typeof portfolioProjects === "undefined" ||
        !Array.isArray(portfolioProjects)
    ) {
        console.error("Portfolio data not found.");
        return;
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("portfolioSearch");

    /**
     * @param {{
     *   category: string,
     *   title: string,
     *   image: string,
     *   badge: string,
     *   description: string,
     *   tech: string[]
     * }} project
     */
    function createPortfolioCard(project) {
        const card = document.createElement("article");

        card.className = "portfolio-card active";
        card.dataset.category = project.category;
        card.dataset.title = project.title.toLowerCase();

        card.innerHTML = `
            <div class="portfolio-image">

                <div class="browser-frame">
                    <div class="browser-dots">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                </div>

                <img
                    src="${project.image}"
                    alt="${project.title}"
                    class="portfolio-preview"
                    loading="eager"
                    onerror="this.style.display='none'; console.error('Portfolio image failed:', this.src);"
                >

                <span class="portfolio-badge">
                    ${project.badge}
                </span>

            </div>

            <div class="portfolio-content">

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="tech-stack">
                    ${project.tech
                        .map((tech) => `<span>${tech}</span>`)
                        .join("")}
                </div>

                <div class="portfolio-buttons">

                    <button
                        type="button"
                        class="btn-primary portfolio-preview-btn"
                        data-image="${project.image}"
                        data-title="${project.title}"
                    >
                        Preview
                    </button>

                    <a
                        href="#contact"
                        class="btn-secondary portfolio-case-btn"
                        data-project="${project.title}"
                    >
                        Discuss Project
                    </a>

                </div>

            </div>
        `;

        return card;
    }

    // =========================
    // RENDER PROJECTS
    // =========================

    portfolioGrid.replaceChildren();

    portfolioProjects.forEach((project) => {
        portfolioGrid.appendChild(
            createPortfolioCard(project)
        );
    });

    // =========================
    // FILTER SYSTEM
    // =========================

    function applyFilters() {
        const activeButton =
            document.querySelector(".filter-btn.active");

        const category =
            activeButton?.dataset.filter || "all";

        const query =
            (searchInput?.value || "")
                .trim()
                .toLowerCase();

        portfolioGrid
            .querySelectorAll(".portfolio-card")
            .forEach((card) => {

                const matchesCategory =
                    category === "all" ||
                    card.dataset.category === category;

                const matchesSearch =
                    !query ||
                    card.innerText
                        .toLowerCase()
                        .includes(query);

                card.style.display =
                    matchesCategory && matchesSearch
                        ? ""
                        : "none";
            });
    }

    // =========================
    // FILTER BUTTONS
    // =========================

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            applyFilters();
        });

    });

    // =========================
    // SEARCH
    // =========================

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            applyFilters
        );
    }

    // =========================
    // GLOBAL ACCESS
    // =========================

    window.applyPortfolioFilters = applyFilters;

    // Initial render
    applyFilters();

    console.log(
        `Rendered ${portfolioProjects.length} portfolio projects.`
    );
});