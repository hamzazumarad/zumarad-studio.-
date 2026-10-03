// =========================================================
// ZUMARAD STUDIO — REAL PORTFOLIO UI
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".portfolio-grid");
    const empty = document.querySelector(".portfolio-empty");
    const modal = document.querySelector("#projectModal");

    if (!grid || !Array.isArray(window.portfolioProjects)) return;

    const projects = window.portfolioProjects;
    const filterButtons = [...document.querySelectorAll(".filter-btn")];

    const escapeHTML = (value = "") =>
        String(value).replace(/[&<>'"]/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#039;",
            '"': "&quot;"
        }[char]));

    const createCard = (project, index) => {
        const card = document.createElement("article");
        card.className = "portfolio-card reveal";
        card.dataset.category = project.category;

        card.innerHTML = `
            <button class="portfolio-image portfolio-story-trigger" type="button"
                    data-project-id="${escapeHTML(project.id)}"
                    aria-label="Open ${escapeHTML(project.title)} project story">
                <span class="portfolio-image-shine"></span>
                <img src="${escapeHTML(project.image)}"
                     alt="${escapeHTML(project.title)} project screenshot"
                     loading="lazy">
                <span class="portfolio-badge">${escapeHTML(project.badge)}</span>
                <span class="portfolio-image-action">
                    View Project <i class="fas fa-arrow-up-right-from-square"></i>
                </span>
            </button>

            <div class="portfolio-content">
                <div class="portfolio-meta">
                    <span>${String(index + 1).padStart(2, "0")}</span>
                    <span>${escapeHTML(project.badge)}</span>
                </div>
                <h3>${escapeHTML(project.title)}</h3>
                <p>${escapeHTML(project.description)}</p>
                <button class="portfolio-story-btn" type="button"
                        data-project-id="${escapeHTML(project.id)}">
                    Read Project Story <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        return card;
    };

    const render = (category = "all") => {
        const visible = projects.filter(
            project => category === "all" || project.category === category
        );

        grid.replaceChildren(
            ...visible.map((project, index) => createCard(project, index))
        );

        if (empty) empty.hidden = visible.length !== 0;
    };

    const openProject = id => {
        const project = projects.find(item => item.id === id);
        if (!project || !modal) return;

        document.querySelector("#projectModalHero").src = project.image;
        document.querySelector("#projectModalHero").alt = `${project.title} project screenshot`;
        document.querySelector("#projectModalBadge").textContent = project.badge;
        document.querySelector("#projectModalTitle").textContent = project.title;
        document.querySelector("#projectModalDescription").textContent = project.description;
        document.querySelector("#projectModalStory").textContent = project.story;
        document.querySelector("#projectModalChallenge").textContent = project.challenge;
        document.querySelector("#projectModalApproach").textContent = project.approach;

        const built = document.querySelector("#projectModalBuilt");
        built.innerHTML = project.built
            .map(item => `<span>${escapeHTML(item)}</span>`)
            .join("");

        const gallery = document.querySelector("#projectModalGallery");
        gallery.innerHTML = project.gallery
            .map((src, i) => `
                <button type="button" class="project-gallery-item"
                        data-image="${escapeHTML(src)}"
                        data-title="${escapeHTML(project.title)} screenshot ${i + 1}">
                    <img src="${escapeHTML(src)}"
                         alt="${escapeHTML(project.title)} screenshot ${i + 1}"
                         loading="lazy">
                </button>
            `)
            .join("");

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("project-modal-open");
    };

    const closeProject = () => {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("project-modal-open");
    };

    grid.addEventListener("click", event => {
        const trigger = event.target.closest("[data-project-id]");
        if (trigger) openProject(trigger.dataset.projectId);
    });

    modal?.addEventListener("click", event => {
        if (event.target.closest("[data-close-project]")) {
            closeProject();
            return;
        }

        const galleryItem = event.target.closest(".project-gallery-item");
        if (galleryItem) {
            const hero = document.querySelector("#projectModalHero");
            hero.src = galleryItem.dataset.image;
            hero.alt = galleryItem.dataset.title;
            document.querySelector(".project-modal-hero").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeProject();
    });

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            render(button.dataset.filter || "all");
        });
    });

    render();
});
