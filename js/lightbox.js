// =========================
// ZUMARAD STUDIO — PROJECT STORY MODAL
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("projectModal");
    if (!modal || typeof portfolioProjects === "undefined") return;

    const image = document.getElementById("projectModalImage");
    const badge = document.getElementById("projectModalBadge");
    const title = document.getElementById("projectModalTitle");
    const description = document.getElementById("projectModalDescription");
    const story = document.getElementById("projectModalStory");
    const challenge = document.getElementById("projectModalChallenge");
    const approach = document.getElementById("projectModalApproach");
    const built = document.getElementById("projectModalBuilt");
    const gallery = document.getElementById("projectModalGallery");

    const open = (id) => {
        const project = portfolioProjects.find(item => item.id === id);
        if (!project) return;

        badge.textContent = project.badge;
        title.textContent = project.title;
        description.textContent = project.description;
        story.textContent = project.story;
        challenge.textContent = project.challenge;
        approach.textContent = project.approach;
        image.src = project.image;
        image.alt = `${project.title} project screenshot`;
        built.innerHTML = project.built.map(item => `<span>${item}</span>`).join("");
        gallery.innerHTML = (project.gallery || [project.image]).map((src, index) => `
            <button type="button" class="project-gallery-item ${index === 0 ? "active" : ""}" data-src="${src}" aria-label="View project screenshot ${index + 1}">
                <img src="${src}" alt="${project.title} screenshot ${index + 1}" loading="lazy">
            </button>
        `).join("");

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("project-modal-open");
        document.querySelector(".project-modal-close")?.focus();
    };

    const close = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("project-modal-open");
        image.removeAttribute("src");
    };

    document.addEventListener("click", event => {
        const trigger = event.target.closest("[data-project-id]");
        if (trigger) {
            open(trigger.dataset.projectId);
            return;
        }
        if (event.target.closest("[data-modal-close]")) close();
        const galleryItem = event.target.closest(".project-gallery-item");
        if (galleryItem) {
            image.src = galleryItem.dataset.src;
            document.querySelectorAll(".project-gallery-item").forEach(item => item.classList.remove("active"));
            galleryItem.classList.add("active");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("active")) close();
    });

    document.querySelector("[data-modal-contact]")?.addEventListener("click", close);
});
