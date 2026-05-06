document.addEventListener('DOMContentLoaded', () => {

    // CARROSSEL
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval;
    const intervalTime = 15000;

    const goToSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let newIndex = (currentSlide + 1) % slideCount;
        goToSlide(newIndex);
    };

    const prevSlide = () => {
        let newIndex = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
    };

    const startAutoPlay = () => { autoPlayInterval = setInterval(nextSlide, intervalTime); };
    const stopAutoPlay = () => { clearInterval(autoPlayInterval); };

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { goToSlide(index); resetAutoPlay(); });
    });

    if(carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    const resetAutoPlay = () => { stopAutoPlay(); startAutoPlay(); };
    startAutoPlay();

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // SCROLL SUAVE
    const menuLinks = document.querySelectorAll('.desktop-menu a, .logo a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});