document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect on scroll for sections
    const sections = document.querySelectorAll('.overview, .gallery, .cta');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(1.875rem)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });

    // Hover effect for gallery cards (tap effect on mobile)
    const galleryCards = document.querySelectorAll('.gallery-card');
    const isMobile = window.innerWidth <= 768;
    galleryCards.forEach(card => {
        const img = card.querySelector('img');
        const overlay = card.querySelector('.gallery-overlay');
        const eventType = isMobile ? 'click' : 'mouseenter';
        const leaveEventType = isMobile ? 'click' : 'mouseleave';

        card.addEventListener(eventType, () => {
            img.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });

        card.addEventListener(leaveEventType, () => {
            if (!isMobile) {
                img.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            }
        });
    });
});