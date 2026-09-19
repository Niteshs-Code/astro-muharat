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

    const serviceData = {

        "Vehicle Booking Muhurat": {
            icon: "fa-solid fa-car",
            description:
                "When you book a vehicle, choosing a time that is auspicious for you can make the occasion more favorable. Always consider an auspicious Muhurat while booking your vehicle."
        },

        "Vehicle Purchase Muhurat": {
            icon: "fa-solid fa-car-side",
            description:
                "A special Muhurat for purchasing a vehicle, determined by an expert astrologer according to your name or date and time of birth."
        },

        "Business Commencement Muhurat": {
            icon: "fa-solid fa-briefcase",
            description:
                "A special Muhurat to begin a new business, determined by an expert astrologer based on your birth details."
        },

        "House Construction Commencement Muhurat": {
            icon: "fa-solid fa-house",
            description:
                "A special Muhurat dedicated to beginning house construction, calculated by a professional astrologer."
        },

        "C-Section Birth Muhurat": {
            icon: "fa-solid fa-baby",
            description:
                "An auspicious time for a C-section birth calculated by an astrologer according to the relevant birth and planetary details."
        },

        "Marriage Muhurat": {
            icon: "fa-solid fa-ring",
            description:
                "An astrologer determines compatibility and an auspicious marriage time after studying the planetary positions and horoscopes of the bride and groom."
        },

        "Gemstone Consultation": {
            icon: "fa-solid fa-gem",
            description:
                "Astrological guidance to identify gemstones that may be suitable according to your birth chart and astrological details."
        },

        "Color Consultation": {
            icon: "fa-solid fa-palette",
            description:
                "Expert guidance regarding beneficial and auspicious colors based on your zodiac sign, name and planetary details."
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

        "House Warming Muhurat": {
            icon: "fa-solid fa-house-chimney",
            description:
                "Auspicious timing guidance for entering a newly constructed or purchased home."
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

    if (serviceSelect) {

        Object.keys(serviceData).forEach(service => {

            const option =
                document.createElement("option");

            option.value = service;

            option.textContent = service;

            serviceSelect.appendChild(option);

        });

    }


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

                const service =
                    consultationForm.querySelector(
                        '[name="service"]'
                    );

                const message =
                    consultationForm.querySelector(
                        '[name="message"]'
                    );


                /* Basic Validation */

                if (
                    !name ||
                    !phone ||
                    !service
                ) {
                    return;
                }


                const nameValue =
                    name.value.trim();

                const phoneValue =
                    phone.value.trim();

                const serviceValue =
                    service.value;


                if (!nameValue) {

                    name.focus();

                    return;

                }


                if (!/^[0-9+\-\s()]{8,15}$/.test(
                    phoneValue
                )) {

                    phone.focus();

                    alert(
                        "Please enter a valid phone number."
                    );

                    return;

                }


                if (!serviceValue) {

                    service.focus();

                    return;

                }


                /* =========================================
                   WHATSAPP MESSAGE
                ========================================= */

                const messageValue =
                    message
                        ? message.value.trim()
                        : "";


                const whatsappMessage =
`Namaste Astro Muhurat,

I would like to enquire about a Muhurat consultation.

Name: ${nameValue}
Phone: ${phoneValue}
Service: ${serviceValue}
${messageValue ? `Message: ${messageValue}` : ""}`;


                const whatsappURL =
                    "https://wa.me/919098135131?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                /* =========================================
                   SUCCESS MESSAGE
                ========================================= */

                if (formSuccess) {

                    formSuccess.classList.add(
                        "show"
                    );

                    setTimeout(() => {

                        formSuccess.classList.remove(
                            "show"
                        );

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