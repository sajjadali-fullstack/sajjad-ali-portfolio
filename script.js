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


// Review

document.addEventListener('DOMContentLoaded', () => {
    const testimonialGrid = document.querySelector('#testimonials .works-grid');
    const reviewForm = document.getElementById('reviewForm');

    // --- 1. Function: Reviews Render Karna (LocalStorage se) ---
    const renderReviews = () => {
        // Sirf manually added reviews ko remove karna refresh ke waqt (static HTML nahi hatega)
        const currentManualReviews = testimonialGrid.querySelectorAll('.manual-entry');
        currentManualReviews.forEach(r => r.remove());

        const savedReviews = JSON.parse(localStorage.getItem('portfolio_reviews')) || [];
        
        savedReviews.forEach((review, index) => {
            const reviewHtml = `
                <div class="work-card testimonial-card manual-entry">
                    <div class="work-content">
                        <div class="client-info" style="position: relative;">
                            <img src="${review.img}" alt="${review.name}" class="client-img">
                            <div>
                                <h3>${review.name}</h3>
                                <p class="client-subtitle">${review.role}</p>
                            </div>
                            <button onclick="removeReview(${index})" style="position: absolute; right: 0; top: 0; color: #ff4d4d; background: none; border: none; cursor: pointer; font-size: 1.2rem;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <p class="testimonial-text">"${review.message}"</p>
                        <div class="rating">${review.stars}</div>
                    </div>
                </div>
            `;
            testimonialGrid.insertAdjacentHTML('afterbegin', reviewHtml);
        });
    };

    // --- 2. Function: Review Delete Karna ---
    window.removeReview = (index) => {
        if (confirm("Kya aap ye review delete karna chahte hain?")) {
            let savedReviews = JSON.parse(localStorage.getItem('portfolio_reviews')) || [];
            savedReviews.splice(index, 1); // Specific index wala item hatana
            localStorage.setItem('portfolio_reviews', JSON.stringify(savedReviews));
            renderReviews(); // UI update karna
        }
    };

    // --- 3. Form Submit Event ---
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('clientName').value;
        const role = document.getElementById('clientRole').value;
        const rating = document.getElementById('clientRating').value;
        const message = document.getElementById('clientMessage').value;
        const imgInput = document.getElementById('clientImgInput');
        
        let imgSrc = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; 

        if (imgInput.files && imgInput.files[0]) {
            imgSrc = URL.createObjectURL(imgInput.files[0]);
        }

        let stars = "";
        for(let i=0; i<5; i++) {
            stars += i < rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }

        // HTML string ke bajaye Object save kar rahe hain (Best Practice)
        const reviewObject = {
            name: name,
            role: role,
            stars: stars,
            message: message,
            img: imgSrc
        };

        const savedReviews = JSON.parse(localStorage.getItem('portfolio_reviews')) || [];
        savedReviews.push(reviewObject);
        localStorage.setItem('portfolio_reviews', JSON.stringify(savedReviews));

        renderReviews();
        this.reset();
        alert("Review added successfully!");
    });

    // Initial Load
    renderReviews();
});
/* save to loacal storage */
// 1. Page load hote hi purane reviews dikhana
window.onload = function() {
    const savedReviews = JSON.parse(localStorage.getItem('myReviews')) || [];
    const container = document.getElementById('testimonialContainer');
    savedReviews.forEach(reviewHtml => {
        container.insertAdjacentHTML('beforeend', reviewHtml);
    });
};

document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // ... (Aapka purana nayaReview generate karne wala code yahan rahega) ...
    
    // 2. Naya review LocalStorage mein save karna
    const savedReviews = JSON.parse(localStorage.getItem('myReviews')) || [];
    savedReviews.push(newReview);
    localStorage.setItem('myReviews', JSON.stringify(savedReviews));

    // UI par dikhana
    document.getElementById('testimonialContainer').insertAdjacentHTML('afterbegin', newReview);
    this.reset();
});
