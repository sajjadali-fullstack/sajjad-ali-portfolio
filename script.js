 // Smooth fade-in effect for sections
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transition = 'opacity 0.8s ease-in-out';
                setTimeout(() => {
                    section.style.opacity = '1';
                }, 200 * index);
            });
        });

        // Animation Cursor
        const cursorDot = document.querySelector(".cursor-dot");
        const cursorOutline = document.querySelector(".cursor-outline");

        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot turant move hoga
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline thoda delay ke saath follow karega (smooth effect)
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Links par hover effect
        const links = document.querySelectorAll('a, button, .cert-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
            });
        });


// Clients

// Scroll Reveal for Testimonials
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});