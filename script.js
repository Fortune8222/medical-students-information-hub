// =========================================
// SAFEGUARD HEALTH — shared script
// =========================================

// ---------- Hamburger menu ----------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menuToggle.innerHTML = open ? "&times;" : "&#9776;";
}

menuToggle.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("open"));
});

// Close the menu after choosing a link, or when Escape is pressed
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { setMenu(false); }
});

// Reset the menu if the window grows to desktop size
window.addEventListener("resize", function () {
    if (window.innerWidth >= 800) { setMenu(false); }
});


// ---------- Contact form (only runs on contact.html) ----------
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        topic: document.getElementById("topic"),
        message: document.getElementById("message")
    };
    const charCount = document.getElementById("char-count");
    const successBox = document.getElementById("form-success");

    function setInvalid(field, isInvalid) {
        field.closest(".form-group").classList.toggle("invalid", isInvalid);
    }

    function validate() {
        let ok = true;

        const nameOk = fields.name.value.trim().length >= 2;
        setInvalid(fields.name, !nameOk);

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim());
        setInvalid(fields.email, !emailOk);

        const topicOk = fields.topic.value !== "";
        setInvalid(fields.topic, !topicOk);

        const messageOk = fields.message.value.trim().length >= 10;
        setInvalid(fields.message, !messageOk);

        return nameOk && emailOk && topicOk && messageOk;
    }

    // Live character counter
    fields.message.addEventListener("input", function () {
        charCount.textContent = fields.message.value.length + " / 500 characters";
    });

    // Clear an error as soon as the user starts fixing it
    Object.values(fields).forEach(function (field) {
        field.addEventListener("input", function () { setInvalid(field, false); });
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        successBox.classList.remove("show");

        if (!validate()) { return; }

        successBox.textContent =
            "Thank you, " + fields.name.value.trim() + "! Your message has been received.";
        successBox.classList.add("show");
        contactForm.reset();
        charCount.textContent = "0 / 500 characters";
    });
}


// ---------- Gallery lightbox (only runs where a #lightbox exists) ----------
const lightbox = document.getElementById("lightbox");

if (lightbox) {
    const lightboxImg = document.getElementById("lightbox-img");

    document.querySelectorAll(".gallery-item img").forEach(function (img) {
        img.addEventListener("click", function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.showModal();
        });
    });

    document.getElementById("lightbox-close").addEventListener("click", function () {
        lightbox.close();
    });
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) { lightbox.close(); }
    });
}
