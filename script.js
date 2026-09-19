/* =========================================================
   ASTRO MUHURAT
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const preloader = document.querySelector(".preloader");

    const header = document.querySelector(".site-header");

    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    const navMenu = document.querySelector(".nav-menu");

    const navLinks = document.querySelectorAll(".nav-link");

    const backToTop = document.querySelector(".back-to-top");

    const revealElements = document.querySelectorAll(".reveal");

    const serviceModal = document.querySelector(".service-modal");

    const modalOverlay = document.querySelector(".modal-overlay");

    const modalClose = document.querySelector(".modal-close");

    const modalTitle = document.querySelector(".modal-box h3");

    const modalDescription = document.querySelector(".modal-box p");

    const modalIcon = document.querySelector(".modal-icon i");

    const serviceButtons = document.querySelectorAll(".service-link");

    const serviceSelect = document.querySelector("#service");

    const consultationForm =
        document.querySelector("#consultationForm");

    const formSuccess =
        document.querySelector(".form-success");


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hide");
            }

        }, 700);

    });


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    handleHeader();

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuBtn && navMenu) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen =
                mobileMenuBtn.classList.toggle("active");

            navMenu.classList.toggle("active", isOpen);

            body.classList.toggle("modal-open", isOpen);

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenuBtn.classList.remove("active");

                navMenu.classList.remove("active");

                body.classList.remove("modal-open");

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU ON OUTSIDE CLICK
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navMenu || !mobileMenuBtn) return;

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            mobileMenuBtn.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");

            mobileMenuBtn.classList.remove("active");

            body.classList.remove("modal-open");

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 90) +
            80;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };

    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

    }


    /* =====================================================
       SERVICE DATA
    ===================================================== */

   /* =====================================================
   SERVICE DATA
===================================================== */

const serviceData = {

    "Vehicle Booking Muhurat": {
        icon: "fa-solid fa-car",
        description:
            "When you book a vehicle, the time being auspicious for you will be more fruitful. Therefore, always look at the auspicious time while booking a vehicle."
    },

    "Vehicle Purchase Muhurat": {
        icon: "fa-solid fa-car-side",
        description:
            "There is a special Muhurat for purchasing a vehicle, determined by an expert astrologer. We will provide you with an auspicious Muhurat according to your name or your date and time of birth."
    },

    "Commercial Vehicle Muhurat": {
        icon: "fa-solid fa-truck",
        description:
            "For commercial vehicles such as trucks, buses, and heavy vehicles, the Muhurat is determined by considering both the owner's name and the transport company's details. Therefore, these Muhurats are considered special."
    },

    "Business Commencement Muhurat": {
        icon: "fa-solid fa-briefcase",
        description:
            "A special Muhurat to start a new business, determined by an expert astrologer. We will provide you with an auspicious Muhurat based on your birth details."
    },

    "Workshop Commencement Muhurat": {
        icon: "fa-solid fa-screwdriver-wrench",
        description:
            "Auspicious timing guidance for beginning a workshop or professional work setup according to relevant astrological details."
    },

    "Factory Commencement Muhurat": {
        icon: "fa-solid fa-industry",
        description:
            "Auspicious Muhurat guidance for starting factory operations and important industrial activities."
    },

    "House Construction Commencement Muhurat": {
        icon: "fa-solid fa-house",
        description:
            "A special Muhurat dedicated to beginning house construction, calculated by a professional astrologer."
    },

    "House Warming Muhurat": {
        icon: "fa-solid fa-house-chimney",
        description:
            "Auspicious timing guidance for entering a newly constructed or purchased home."
    },

    "C-Section Birth Muhurat": {
        icon: "fa-solid fa-baby",
        description:
            "Childbirth is a significant event; an astrologer calculates an auspicious time for a C-section birth, ensuring a healthier and better future for the baby."
    },

    "Marriage Muhurat": {
        icon: "fa-solid fa-ring",
        description:
            "An astrologer determines the compatibility and auspicious time for marriage after matching the planetary positions and horoscopes of the bride and groom."
    },

    "Gemstone Consultation": {
        icon: "fa-solid fa-gem",
        description:
            "Astrological advice to identify which gemstone will be most beneficial for you based on your birth chart and astrological details."
    },

    "Color Consultation": {
        icon: "fa-solid fa-palette",
        description:
            "Expert guidance on lucky and beneficial colors calculated by a professional astrologer based on your zodiac sign."
    },

    "Shubh Ank Consultation": {
        icon: "fa-solid fa-hashtag",
        description:
            "Numbers have great importance. A number can be auspicious for one person and inauspicious for another. We will research your name and provide your suitable number. Numbers are especially important for vehicles, mobile phones and houses. Therefore, having an auspicious number is important."
    },

    "Showroom Opening Muhurat": {
        icon: "fa-solid fa-store",
        description:
            "An auspicious Muhurat for opening a showroom or commercial establishment."
    }

};


    /* =====================================================
       OPEN SERVICE MODAL
    ===================================================== */

    const openServiceModal = (serviceName) => {

        if (!serviceModal) return;

        const data =
            serviceData[serviceName];

        if (!data) return;

        if (modalTitle) {

            modalTitle.textContent =
                serviceName;

        }

        if (modalDescription) {

            modalDescription.textContent =
                data.description;

        }

        if (modalIcon) {

            modalIcon.className =
                data.icon;

        }

        serviceModal.classList.add("active");

        body.classList.add("modal-open");

    };


    /* =====================================================
       SERVICE BUTTON EVENTS
    ===================================================== */

    serviceButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(".service-card");

            if (!card) return;

            const title =
                card.querySelector("h3");

            if (!title) return;

            const serviceName =
                title.textContent.trim();

            openServiceModal(serviceName);

        });

    });


    /* =====================================================
       CLOSE SERVICE MODAL
    ===================================================== */

    const closeServiceModal = () => {

        if (!serviceModal) return;

        serviceModal.classList.remove("active");

        body.classList.remove("modal-open");

    };


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeServiceModal
        );

    }

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeServiceModal
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            serviceModal &&
            serviceModal.classList.contains("active")
        ) {

            closeServiceModal();

        }

    });


    /* =====================================================
       SERVICE SELECT
    ===================================================== */

    


    /* =====================================================
       MODAL → FORM
    ===================================================== */

    const modalConsultationBtn =
        document.querySelector(
            ".modal-box .btn"
        );

    if (modalConsultationBtn) {

        modalConsultationBtn.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const selectedService =
                    modalTitle
                        ? modalTitle.textContent.trim()
                        : "";

                closeServiceModal();

                if (serviceSelect) {

                    const optionExists =
                        [...serviceSelect.options]
                            .some(
                                option =>
                                    option.value ===
                                    selectedService
                            );

                    if (optionExists) {

                        serviceSelect.value =
                            selectedService;

                    }

                }

                const consultation =
                    document.querySelector(
                        "#consultation"
                    );

                if (consultation) {

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        consultation.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }

            }
        );

    }


/* =====================================================
   CONSULTATION FORM
===================================================== */

if (consultationForm) {

    consultationForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const name =
                consultationForm.querySelector(
                    '[name="name"]'
                );

            const phone =
                consultationForm.querySelector(
                    '[name="phone"]'
                );

            const email =
                consultationForm.querySelector(
                    '[name="email"]'
                );

            const service =
                consultationForm.querySelector(
                    '[name="service"]'
                );

            const birthDate =
                consultationForm.querySelector(
                    '[name="birthDate"]'
                );

            const birthTime =
                consultationForm.querySelector(
                    '[name="birthTime"]'
                );

            const birthPlace =
                consultationForm.querySelector(
                    '[name="birthPlace"]'
                );

            const message =
                consultationForm.querySelector(
                    '[name="message"]'
                );


            /* =========================================
               REQUIRED FIELD VALIDATION
            ========================================= */

            if (
                !name ||
                !service ||
                !birthDate ||
                !birthPlace
            ) {
                return;
            }


            const nameValue =
                name.value.trim();

            const phoneValue =
                phone ? phone.value.trim() : "";

            const emailValue =
                email ? email.value.trim() : "";

            const serviceValue =
                service.value;

            const birthDateValue =
                birthDate.value;

            const birthTimeValue =
                birthTime
                    ? birthTime.value
                    : "";

            const birthPlaceValue =
                birthPlace.value.trim();

            const messageValue =
                message
                    ? message.value.trim()
                    : "";


            /* =========================================
               BASIC VALIDATION
            ========================================= */

            if (!nameValue) {
                name.focus();
                return;
            }

            if (!serviceValue) {
                service.focus();
                return;
            }

            if (!birthDateValue) {
                birthDate.focus();
                return;
            }

            if (!birthPlaceValue) {
                birthPlace.focus();
                return;
            }


            /* =========================================
               OPTIONAL PHONE VALIDATION
            ========================================= */

            if (
                phoneValue &&
                !/^[0-9+\-\s()]{8,15}$/.test(phoneValue)
            ) {

                phone.focus();

                alert(
                    "Please enter a valid phone number."
                );

                return;
            }


            /* =========================================
               WHATSAPP MESSAGE
            ========================================= */

            const whatsappMessage =
`Namaste Astro Muhurat,

I would like to enquire about a Muhurat consultation.

Name: ${nameValue}
Phone: ${phoneValue || "Not provided"}
Email: ${emailValue || "Not provided"}
Service: ${serviceValue}
Date of Birth: ${birthDateValue}
Birth Time: ${birthTimeValue || "Not provided"}
Place of Birth: ${birthPlaceValue}
${messageValue ? `Additional Details: ${messageValue}` : ""}`;


            const whatsappURL =
                "https://wa.me/919098135131?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            /* =========================================
               SUCCESS MESSAGE
            ========================================= */

            if (formSuccess) {

                formSuccess.classList.add("show");

                setTimeout(() => {

                    formSuccess.classList.remove("show");

                }, 5000);

            }


            /* =========================================
               OPEN WHATSAPP
            ========================================= */

            setTimeout(() => {

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }, 500);


            consultationForm.reset();

        }
    );

}

    


    /* =====================================================
       PHONE NUMBER CLICK
    ===================================================== */

    document
        .querySelectorAll(
            '[data-phone="9098135131"]'
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "tel:+919098135131";

                }
            );

        });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };

    handleBackToTop();

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       PHONE INPUT
       Allow only useful phone characters
    ===================================================== */

    const phoneInput =
        document.querySelector(
            'input[name="phone"]'
        );

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll("[data-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity = "0";

                }
            );

        });


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 0.04, 0.25)}s`;

        }
    );


    /* =====================================================
       PREVENT EMPTY LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c Astro Muhurat ",
        "background:#3d0d17;color:#eecf78;font-size:18px;font-weight:bold;padding:8px 12px;"
    );

    console.log(
        "%cAuspicious moments, thoughtfully calculated.",
        "color:#c99c3c;font-size:12px;"
    );

});