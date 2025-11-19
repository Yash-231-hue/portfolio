document.addEventListener('DOMContentLoaded', () => {
    console.log("📊 Professional Portfolio Loaded");

    // Carousel functionality
    const carousel = document.getElementById('project-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    const totalSlides = carousel ? carousel.children.length : 0;

    function updateCarousel() {
        if (carousel) {
            const translateX = -currentIndex * 100 / 3; // Assuming 3 slides visible on desktop
            gsap.to(carousel, { x: `${translateX}%`, duration: 0.5, ease: 'power2.out' });
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 3;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalSlides - 3) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    // GSAP animations for project cards
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.project-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Hover animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Auto-play carousel
    if (carousel) {
        setInterval(() => {
            currentIndex = (currentIndex < totalSlides - 3) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Skills Modal Functionality
    const skillsBtn = document.getElementById('skills-btn');
    const skillsModal = document.getElementById('skills-modal');
    const closeModal = document.getElementById('close-modal');
    const closeModalBottom = document.getElementById('close-modal-bottom');

    if (skillsBtn && skillsModal) {
        skillsBtn.addEventListener('click', () => {
            skillsModal.classList.remove('hidden');
            skillsModal.classList.add('flex');
        });

        const closeModalFunc = () => {
            skillsModal.classList.add('hidden');
            skillsModal.classList.remove('flex');
        };

        closeModal.addEventListener('click', closeModalFunc);
        closeModalBottom.addEventListener('click', closeModalFunc);

        // Close modal when clicking outside
        skillsModal.addEventListener('click', (e) => {
            if (e.target === skillsModal) {
                closeModalFunc();
            }
        });
    }
});
