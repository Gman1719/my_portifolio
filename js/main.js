document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK/LIGHT MODE TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const modeIcon = document.querySelector('.mode-icon');
    const body = document.body;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        modeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        let theme = 'dark';
        if (body.classList.contains('light-theme')) {
            theme = 'light';
            modeIcon.textContent = '☀️';
        } else {
            modeIcon.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    });

    // --- 2. SKILL BAR ANIMATION ON SCROLL ---
    const skillBars = document.querySelectorAll('.skill-bar span');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1"; 
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.opacity = "0";
        bar.style.transform = "translateX(-20px)";
        bar.style.transition = "all 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)";
        skillObserver.observe(bar);
    });

    // --- 3. NAVBAR SCROLL EFFECT (Updated to be Theme-Aware) ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });
  
    // Auto update copyright year
document.getElementById("year").textContent = new Date().getFullYear();

    // --- 4. CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert(`Success! Message sent. I will get back to you soon.`);
                contactForm.reset();
            } else {
                alert("Oops! There was a problem.");
            }
        } catch (error) {
            alert("Error: Check your internet connection.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
// About section Read More toggle
const readMoreBtn = document.getElementById("readMoreBtn");
const aboutMore = document.getElementById("aboutMore");

if (readMoreBtn && aboutMore) {
  readMoreBtn.addEventListener("click", () => {
    if (aboutMore.style.display === "block") {
      aboutMore.style.display = "none";
      readMoreBtn.textContent = "Read More";
    } else {
      aboutMore.style.display = "block";
      readMoreBtn.textContent = "Read Less";
    }
  });
}
