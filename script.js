document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Menu Mobile ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-list a, .nav-btn");

    // Abrir/fechar menu mobile
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.innerHTML = navMenu.classList.contains("active") ? "&#10005;" : "&#9776;";
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove("active");
                menuToggle.innerHTML = "&#9776;";
            }
        });
    });

    // --- 2. Hero Background Slideshow (Automático) ---
    const heroSlides = document.querySelectorAll("#heroBgSlider .hero-slide");
    let currentHeroSlide = 0;
    const heroSlideInterval = 5000; // Tempo em milissegundos (5s)

    function nextHeroSlide() {
        // Remove active do slide atual
        heroSlides[currentHeroSlide].classList.remove("active");
        // Próximo slide (volta ao zero no final)
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        // Adiciona active ao novo slide
        heroSlides[currentHeroSlide].classList.add("active");
    }

    // Inicia o slideshow automático se houver slides
    if (heroSlides.length > 0) {
        setInterval(nextHeroSlide, heroSlideInterval);
    }

    // --- 3. Infraestrutura Slideshow (Manual com Dots) ---
    const infraSlider = document.getElementById("infraSlider");
    const infraSlides = document.querySelectorAll("#infraSlider .infra-slide");
    const infraPrev = document.getElementById("infraPrev");
    const infraNext = document.getElementById("infraNext");
    const infraDotsContainer = document.getElementById("infraDots");
    
    let currentInfraSlide = 0;

    // Cria os dots de navegação dinamicamente
    infraSlides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToInfraSlide(index));
        infraDotsContainer.appendChild(dot);
    });

    const infraDots = document.querySelectorAll("#infraDots .dot");

    function updateInfraSlides() {
        // Lógica simples de mostrar/esconder (pode ser melhorado para slide horizontal)
        infraSlides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentInfraSlide);
        });
        
        infraDots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentInfraSlide);
        });
    }

    function goToInfraSlide(index) {
        currentInfraSlide = index;
        updateInfraSlides();
    }

    function nextInfraSlide() {
        currentInfraSlide = (currentInfraSlide + 1) % infraSlides.length;
        updateInfraSlides();
    }

    function prevInfraSlide() {
        currentInfraSlide = (currentInfraSlide - 1 + infraSlides.length) % infraSlides.length;
        updateInfraSlides();
    }

    // Eventos dos botões
    if (infraPrev && infraNext) {
        infraNext.addEventListener("click", nextInfraSlide);
        infraPrev.addEventListener("click", prevInfraSlide);
    }

    // Inicia o estado do slideshow de infraestrutura
    if (infraSlides.length > 0) {
        updateInfraSlides();
    }
});