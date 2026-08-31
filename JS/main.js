/* =====================================================
   NAVBAR
===================================================== */

const header = document.querySelector("header");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 100) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =====================================================
   GSAP ANIMATIONS
   Only run if GSAP exists
===================================================== */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {

    gsap.registerPlugin(ScrollTrigger);


    /* Statement */

    if (document.querySelector(".statement-title .line")) {

        gsap.from(".statement-title .line", {

            y:120,

            opacity:0,

            duration:1,

            stagger:0.25,

            ease:"power4.out",

            scrollTrigger:{

                trigger:".statement",

                start:"top 70%"

            }

        });

    }


    /* About Image */

    if (document.querySelector(".about-image img")) {

        gsap.from(".about-image img", {

            scale:1.15,

            opacity:0,

            duration:1.5,

            ease:"power3.out",

            scrollTrigger:{

                trigger:".about",

                start:"top 75%"

            }

        });

    }


    /* About Tag */

    if (document.querySelector(".about .section-tag")) {

        gsap.from(".about .section-tag", {

            y:30,

            opacity:0,

            duration:0.8,

            scrollTrigger:{

                trigger:".about-content",

                start:"top 75%"

            }

        });

    }


    /* About Content */

    if (document.querySelector(".about-content")) {

        gsap.from(".about-content", {

            y:80,

            opacity:0,

            duration:1,

            scrollTrigger:{

                trigger:".about-content",

                start:"top 80%"

            }

        });

    }

}


/* =====================================================
   SERVICES IMAGE SWITCH
===================================================== */

const services = document.querySelectorAll(".service");
const serviceImage = document.getElementById("serviceImage");

if (services.length && serviceImage) {

    services.forEach(service => {

        service.addEventListener("mouseenter", () => {

            serviceImage.src = service.dataset.image;

        });

    });

}


/* =====================================================
   PROJECT SLIDER
===================================================== */

const slides = document.querySelectorAll(".slide");
const progress = document.querySelector(".progress-bar");

if (slides.length && progress) {

    let current = 0;


    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        slides[index].classList.add("active");


        progress.style.transition = "none";

        progress.style.width = "0";


        setTimeout(() => {

            progress.style.transition = "width 5s linear";

            progress.style.width = "100%";

        },50);

    }


    showSlide(current);


    function nextSlide() {

        current++;

        if (current >= slides.length) {

            current = 0;

        }

        showSlide(current);

    }


    let auto = setInterval(nextSlide,5000);


    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");


    if (nextButton) {

        nextButton.onclick = () => {

            clearInterval(auto);

            nextSlide();

            auto = setInterval(nextSlide,5000);

        };

    }


    if (prevButton) {

        prevButton.onclick = () => {

            clearInterval(auto);

            current--;

            if (current < 0) {

                current = slides.length - 1;

            }

            showSlide(current);

            auto = setInterval(nextSlide,5000);

        };

    }

}


/* =====================================================
   NUMBERS
===================================================== */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined" &&
    document.querySelector(".numbers")
) {

    const counters = document.querySelectorAll(".counter");


    ScrollTrigger.create({

        trigger:".numbers",

        start:"top 70%",

        once:true,

        onEnter:() => {

            counters.forEach(counter => {

                let target = +counter.dataset.target;

                let obj = { value:0 };


                gsap.to(obj, {

                    value:target,

                    duration:2,

                    ease:"power2.out",

                    onUpdate:() => {

                        counter.innerText =
                            Math.floor(obj.value);

                    }

                });

            });

        }

    });

}


/* =====================================================
   MOBILE NAVBAR
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* =====================================================
   CUSTOM CURSOR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");


    if (!cursor || !cursorDot) {

        return;

    }


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener("mousemove", function(e) {

        mouseX = e.clientX;
        mouseY = e.clientY;


        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });


    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;


        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";


        requestAnimationFrame(animateCursor);

    }


    animateCursor();


    document.addEventListener("mouseover", function(e) {

        if (
            e.target.closest("a") ||
            e.target.closest("button") ||
            e.target.closest(".project-card")
        ) {

            cursor.classList.add("hover");

        }

    });


    document.addEventListener("mouseout", function(e) {

        if (
            e.target.closest("a") ||
            e.target.closest("button") ||
            e.target.closest(".project-card")
        ) {

            cursor.classList.remove("hover");

        }

    });

});


/* =====================================================
   HIDE NAVBAR ON HOMEPAGE PROJECT SECTION
===================================================== */

const projectsSection = document.querySelector(".projects");

if (projectsSection && header) {

    const projectObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    header.classList.add("hide-navbar");

                } else {

                    header.classList.remove("hide-navbar");

                }

            });

        },

        {
            threshold:0.25
        }

    );


    projectObserver.observe(projectsSection);

}

/* =====================================================
   PROJECT PAGE ANIMATIONS
===================================================== */

const projectCards = document.querySelectorAll(".project-card");
const projectsCTA = document.querySelector(".projects-cta");

if (projectCards.length) {

    const projectAnimationObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const card = entry.target;

                    const delay =
                        Array.from(projectCards).indexOf(card) * 120;

                    setTimeout(() => {

                        card.classList.add("show");

                    }, delay);

                    projectAnimationObserver.unobserve(card);

                }

            });

        },

        {
            threshold:0.15
        }

    );


    projectCards.forEach(card => {

        projectAnimationObserver.observe(card);

    });

}


/* ---------- CTA REVEAL ---------- */

if (projectsCTA) {

    const ctaObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    projectsCTA.classList.add("show");

                    ctaObserver.unobserve(projectsCTA);

                }

            });

        },

        {
            threshold:0.2
        }

    );


    ctaObserver.observe(projectsCTA);

}

// Mecca Avenue page
/* =====================================================
   PROJECT PAGE ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= HERO ================= */

    const heroContent = document.querySelector(".project-detail-hero-content");

    if (heroContent) {

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(50px)";

        setTimeout(() => {

            heroContent.style.transition =
                "opacity 1s ease, transform 1s ease";

            heroContent.style.opacity = "1";
            heroContent.style.transform = "translateY(0)";

        }, 200);

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".project-main-image, " +
        ".project-overview, " +
        ".project-information, " +
        ".project-gallery, " +
        ".project-highlights, " +
        ".project-cta"
    );


    revealElements.forEach(element => {

        element.classList.add("project-reveal");

    });


    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= HIGHLIGHT ROWS ================= */

    const highlightRows =
        document.querySelectorAll(".highlights-list div");


    highlightRows.forEach((row, index) => {

        row.classList.add("highlight-reveal");

        row.style.transitionDelay =
            `${index * 0.15}s`;

    });


    const highlightObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.2
        }

    );


    highlightRows.forEach(row => {

        highlightObserver.observe(row);

    });


});
// MeccaAvenue page
/* =====================================================
   MECCA AVENUE PAGE ANIMATIONS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= HERO ================= */

    const intro = document.querySelector(".intro-content");

    if (intro) {

        setTimeout(function () {

            intro.classList.add("animate");

        }, 150);

    }


    /* ================= SCROLL ANIMATIONS ================= */

    const animatedElements = document.querySelectorAll(

        ".project-image-section .project-image-wrapper," +
        ".overview-title," +
        ".overview-text," +
        ".information-block," +
        ".highlights-title," +
        ".highlight-item," +
        ".project-cta > *," +
        ".site-footer > *"

    );


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("animate");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );


    animatedElements.forEach(function (element) {

        observer.observe(element);

    });

});
