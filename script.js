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

document.addEventListener("wheel", function (event) {
    const semiCircle = document.querySelector(".sec2b-semicircle");
    const content = document.querySelectorAll(".section2 > *:not(.section2b), header"); 
    const sec2bImg = document.querySelector(".sec2b-img");
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

    if (newScale >= 4) {
        sec2bImg.classList.add("move-left-center");
    } else {
        sec2bImg.classList.remove("move-left-center");
    }
});
const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let sparks = [];

function easeOut(t) {
    return t * (2 - t);
}

function createSparks(x, y) {
    const sparkCount = 8;
    const sparkRadius = 15;
    const sparkSize = 10;
    const duration = 400;
    const now = performance.now();

    for (let i = 0; i < sparkCount; i++) {
        sparks.push({
            x, y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
            duration,
            sparkSize,
            sparkRadius
        });
    }
}

function animateSparks(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparks = sparks.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= spark.duration) return false;

        const progress = elapsed / spark.duration;
        const eased = easeOut(progress);
        const distance = eased * spark.sparkRadius;

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = x1 + spark.sparkSize * (1 - eased) * Math.cos(spark.angle);
        const y2 = y1 + spark.sparkSize * (1 - eased) * Math.sin(spark.angle);

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
    });

    requestAnimationFrame(animateSparks);
}

canvas.addEventListener("click", (e) => {
    createSparks(e.clientX, e.clientY);
});

requestAnimationFrame(animateSparks);
