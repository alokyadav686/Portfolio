document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const indicator = document.getElementById("nav-indicator");

    function updateIndicator(activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const navbarRect = document.querySelector(".navbar").getBoundingClientRect();

        indicator.style.width = `${linkRect.width + 20}px`; 
        indicator.style.left = `${linkRect.left - navbarRect.left - 10}px`;
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); 
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            updateIndicator(this);
        });
    });

    updateIndicator(document.querySelector(".nav-link.active"));
});
