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
    const content = document.querySelectorAll(".section2 > *:not(.section2b), header"); 
    const body = document.body;

    let scaleFactor = parseFloat(semiCircle.getAttribute("data-scale")) || 1;
    let newScale = scaleFactor + event.deltaY * 0.002; 

    newScale = Math.max(1, Math.min(newScale, 5));

    semiCircle.style.transform = `translateX(-50%) scale(${newScale})`;
    semiCircle.setAttribute("data-scale", newScale);

    let opacity = 1 - ((newScale - 1) / 4);
    content.forEach(element => {
        element.style.opacity = opacity;
    });

    body.style.overflow = newScale >= 5 ? "hidden" : "auto";
});
