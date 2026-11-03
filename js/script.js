
/* =========================================
   1. DARK MODE TOGGLE
========================================= */

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {

    document.body.classList.toggle("dark-theme", theme === "dark");

    if (themeToggle) {

        const icon = themeToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("bi-moon-stars-fill", theme !== "dark");
            icon.classList.toggle("bi-sun-fill", theme === "dark");
        }

        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme") || "light";

applyTheme(savedTheme);

// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isDark = document.body.classList.contains("dark-theme");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem("portfolio-theme", newTheme);

    });

}


/* =========================================
   2. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("active");
    });

}


/* =========================================
   3. TYPEWRITER EFFECT
========================================= */

const typingElement = document.querySelector(".typing-text");

if (typingElement) {

    const words = [
        "Monia Mohammed",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (deleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }

        typingElement.textContent = currentWord.substring(
            0,
            characterIndex
        );

        let speed = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentWord.length) {

            deleting = true;
            speed = 1400;

        } else if (deleting && characterIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            speed = 400;

        }

        setTimeout(typeEffect, speed);

    }

    typeEffect();

}


/* =========================================
   4. BACK TO TOP BUTTON
========================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   5. ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");

const navLinks = document.querySelectorAll(".navbar .nav-link");

if (sections.length && navLinks.length) {

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 130;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });

}


/* =========================================
   6. MOBILE NAVIGATION
========================================= */

const navbarLinks = document.querySelectorAll(
    ".navbar-collapse .nav-link"
);

navbarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show") &&
            typeof bootstrap !== "undefined"
        ) {

            const collapseInstance =
                bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

            collapseInstance.hide();

        }

    });

});


/* =========================================
   7. AUTOMATIC COPYRIGHT YEAR
========================================= */

const copyrightYear = document.getElementById("year");

if (copyrightYear) {

    copyrightYear.textContent = new Date().getFullYear();

}


/* =========================================
   8. SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

/* =================================
   TYPING NAME ANIMATION
================================= */
