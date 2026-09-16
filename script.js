/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


/* =========================
   PICTURES LIGHTBOX
========================= */

const galleryImages = document.querySelectorAll(".gallery img");

let currentImage = 0;

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>

    <button class="lightbox-prev">&#10094;</button>

    <img class="lightbox-image" src="" alt="">

    <button class="lightbox-next">&#10095;</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");


function showImage(index) {

    if (index < 0) {
        currentImage = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
        currentImage = 0;
    } else {
        currentImage = index;
    }

    const image = galleryImages[currentImage];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}


galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {
        showImage(index);
    });

});


lightboxClose.addEventListener("click", closeLightbox);


lightboxPrev.addEventListener("click", () => {
    showImage(currentImage - 1);
});


lightboxNext.addEventListener("click", () => {
    showImage(currentImage + 1);
});


/* Klik area luar gambar untuk menutup */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImage - 1);
    }

    if (event.key === "ArrowRight") {
        showImage(currentImage + 1);
    }

});


/* =========================
   CV VIEWER
========================= */

const cvImage = document.querySelector(".cv-container img");

const cvLightbox = document.createElement("div");

cvLightbox.className = "cv-lightbox";

cvLightbox.innerHTML = `
    <button class="cv-close">&times;</button>
    <img src="" alt="Curriculum Vitae">
`;

document.body.appendChild(cvLightbox);

const cvViewerImage = cvLightbox.querySelector("img");
const cvClose = cvLightbox.querySelector(".cv-close");


function openCV() {

    cvViewerImage.src = cvImage.src;

    cvLightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeCV() {

    cvLightbox.classList.remove("active");

    document.body.style.overflow = "";
}


cvImage.addEventListener("click", openCV);

cvClose.addEventListener("click", closeCV);


cvLightbox.addEventListener("click", (event) => {

    if (event.target === cvLightbox) {
        closeCV();
    }

});


/* =========================
   CV KEYBOARD
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeCV();
    }

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});

/* =========================
   KARYA
========================= */

const karyaContainer = document.getElementById("karyaContainer");

if (karyaContainer) {
    fetch("karya.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal membaca karya.json");
            }

            return response.json();
        })
        .then(karya => {

            karyaContainer.innerHTML = "";

            karya.forEach(item => {

                const card = document.createElement("div");
                card.className = "karya-card";

                if (item.type === "website") {

                    card.innerHTML = `
                        <div class="karya-preview website-preview">
                            <span>🌐</span>
                        </div>

                        <div class="karya-info">
                            <span class="karya-type">WEBSITE</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>

                            <a
                                href="${item.url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn primary"
                            >
                                Lihat Website
                            </a>
                        </div>
                    `;

                } else if (item.type === "gambar") {

                    card.innerHTML = `
                        <div class="karya-preview">
                            <img
                                src="${item.url}"
                                alt="${item.title}"
                            >
                        </div>

                        <div class="karya-info">
                            <span class="karya-type">GAMBAR</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;

                } else if (item.type === "video") {

                    card.innerHTML = `
                        <div class="karya-preview">
                            <video
                                src="${item.url}"
                                controls
                                preload="metadata"
                            ></video>
                        </div>

                        <div class="karya-info">
                            <span class="karya-type">VIDEO</span>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                }

                karyaContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);

            karyaContainer.innerHTML = `
                <p class="karya-error">
                    Karya gagal dimuat.
                </p>
            `;
        });
}