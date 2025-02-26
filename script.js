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
function applyShinyEffect(elementId, speed, disabled) {
    const element = document.getElementById(elementId);
    if (element) {
        if (disabled) {
            element.classList.add('disabled');
        } else {
            element.classList.remove('disabled');
            element.style.animationDuration = speed + 's';
        }
    }
}

applyShinyEffect('shinyText', 3, false);

document.addEventListener("wheel", function (event) {
    const semiCircle = document.querySelector(".sec2b-semicircle");
    const content = document.querySelectorAll(".section2 > *:not(.section2b), header"); // Everything except semicircle
    const body = document.body;

    let scaleFactor = parseFloat(semiCircle.getAttribute("data-scale")) || 1;
    let newScale = scaleFactor + event.deltaY * 0.002; // Adjust sensitivity

    // Restrict scale between 1 (default) and 5 (max expansion)
    newScale = Math.max(1, Math.min(newScale, 5));

    // Apply scaling transformation to semicircle
    semiCircle.style.transform = `scale(${newScale})`;
    semiCircle.setAttribute("data-scale", newScale);

    // Calculate opacity for everything else (1 at start, 0 when fully expanded)
    let opacity = 1 - ((newScale - 1) / 4);

    // Apply opacity to all elements except the semicircle
    content.forEach(element => {
        element.style.opacity = opacity;
    });

    // Optional: Hide body overflow when fully expanded
    if (newScale >= 5) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }
});
