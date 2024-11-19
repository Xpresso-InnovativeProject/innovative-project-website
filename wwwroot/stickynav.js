document.addEventListener("DOMContentLoaded", () => {
    function setupStickyNavigation() {
        const nav = document.getElementById('main-nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY) {
                nav.classList.add('scrolled-up');
                nav.classList.remove('visible');
            } else {
                nav.classList.remove('scrolled-up');
                nav.classList.add('visible');
            }
            lastScrollY = window.scrollY;

            if (window.scrollY === 0) {
                nav.classList.remove('scrolled-up', 'visible');
            }
        });
    }

    function highlightActiveNav() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");

        function updateActiveLink() {
            let currentSection = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
                    currentSection = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("data-section") === currentSection) {
                    link.classList.add("active");
                }
            });
        }
        window.addEventListener("scroll", updateActiveLink);
        updateActiveLink();
    }

    setupStickyNavigation();
    highlightActiveNav();
});

const navLinks = document.querySelectorAll('a[href^="#"]');

// Listen for click events on the navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Get the target section's ID
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Get the height of the sticky nav
        const navHeight = document.querySelector('#main-nav').offsetHeight;

        // Scroll to the target section with an offset for the nav height
        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});