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
// Auto-navigation for code snippets carousel
// ===== COMPLETE CODE SNIPPETS CAROUSEL FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CODE SNIPPETS CAROUSEL AUTO-NAVIGATION =====
    const snippetTrack = document.getElementById('snippetTrack');
    const slides = document.querySelectorAll('.snippet-slide');
    const indicators = document.querySelectorAll('.indicator');
    const headerDots = document.querySelectorAll('.indicator-dot');
    const cardNavButtons = document.querySelectorAll('.card-nav-btn');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 seconds between slides
    
    // Function to show a specific slide
    function showSlide(index) {
        // Validate index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(ind => {
            ind.classList.remove('active');
        });
        
        headerDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide
        slides[index].classList.add('active');
        
        // Update indicators
        if (indicators[index]) indicators[index].classList.add('active');
        if (headerDots[index]) headerDots[index].classList.add('active');
        
        // Update current slide counter in navigation
        const slideCounters = document.querySelectorAll('.slide-counter');
        slideCounters.forEach(counter => {
            counter.textContent = `${index + 1}/${slides.length}`;
        });
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0; // Loop back to first slide
        }
        showSlide(next);
    }
    
    // Previous slide function
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1; // Loop to last slide
        }
        showSlide(prev);
    }
    
    // Start auto-navigation
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        slideInterval = setInterval(nextSlide, slideDelay);
        console.log('Autoplay started');
    }
    
    // Stop auto-navigation
    function stopAutoPlay() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
            console.log('Autoplay stopped');
        }
    }
    
    // Make navigation functions globally available for onclick handlers
    window.navigateSnippet = function(direction) {
        stopAutoPlay();
        if (direction === 'next') {
            nextSlide();
        } else if (direction === 'prev') {
            prevSlide();
        }
        startAutoPlay(); // Restart autoplay after manual navigation
    };
    
    // Add click handlers to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // Add click handlers to all prev/next buttons (including card-nav-btn)
    const prevButtons = document.querySelectorAll('.prev-btn, .carousel-nav-btn.prev, .card-nav-btn.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn, .carousel-nav-btn.next, .card-nav-btn.next-btn');
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.navigateSnippet('prev');
        });
    });
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.navigateSnippet('next');
        });
    });
    
    // Pause autoplay when hovering over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            stopAutoPlay();
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            startAutoPlay();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only if carousel is in viewport
        const carouselSection = document.getElementById('code-snippets');
        if (!carouselSection) return;
        
        const rect = carouselSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                window.navigateSnippet('prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                window.navigateSnippet('next');
            }
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });
        
        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }, { passive: true });
        
        carouselContainer.addEventListener('touchcancel', function() {
            startAutoPlay();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
    
    // ===== COPY CODE FUNCTIONALITY =====
    window.copyCode = function(button) {
        // Find the code block
        const codeBlockContainer = button.closest('.code-block-container');
        if (!codeBlockContainer) return;
        
        const codeElement = codeBlockContainer.querySelector('code');
        if (!codeElement) return;
        
        let codeText = codeElement.textContent || codeElement.innerText;
        
        // Clean up the code text (remove extra indentation if needed)
        codeText = codeText.trim();
        
        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(codeText).then(function() {
                // Show success feedback
                copySuccess(button);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
                fallbackCopy(codeText, button);
            });
        } else {
            // Fallback for older browsers
            fallbackCopy(codeText, button);
        }
    };
    
    function copySuccess(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.classList.remove('copied');
        }, 2000);
    }
    
    function fallbackCopy(text, button) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            copySuccess(button);
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Failed to copy code. Please try selecting and copying manually.');
        }
        
        document.body.removeChild(textarea);
    }
    
    // ===== INITIALIZE CAROUSEL =====
    function initCarousel() {
        // Check if we have slides
        if (slides.length === 0) {
            console.warn('No slides found in carousel');
            return;
        }
        
        // Ensure first slide is active
        showSlide(0);
        
        // Start autoplay
        startAutoPlay();
        
        // Preload images if any (optional)
        console.log('Code snippets carousel initialized with', slides.length, 'slides');
    }
    
    // Initialize everything
    initCarousel();
    
    // ===== ADDITIONAL ENHANCEMENTS =====
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        stopAutoPlay();
    });
    
    // Optional: Add loading state for images in code blocks
    const codeImages = document.querySelectorAll('.code-wrapper img');
    codeImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
    });
});

// ===== ADDITIONAL UTILITY FUNCTIONS (if needed) =====

// Function to manually jump to a specific slide (can be called from console)
window.jumpToSnippet = function(slideNumber) {
    const slides = document.querySelectorAll('.snippet-slide');
    if (slideNumber >= 1 && slideNumber <= slides.length) {
        // Trigger click on corresponding indicator
        const indicators = document.querySelectorAll('.indicator');
        if (indicators[slideNumber - 1]) {
            indicators[slideNumber - 1].click();
        }
    } else {
        console.log(`Please enter a number between 1 and ${slides.length}`);
    }
};

// Function to pause autoplay
window.pauseSnippets = function() {
    const event = new CustomEvent('mouseenter');
    document.querySelector('.carousel-container')?.dispatchEvent(event);
    console.log('Snippets carousel paused');
};

// Function to resume autoplay
window.resumeSnippets = function() {
    const event = new CustomEvent('mouseleave');
    document.querySelector('.carousel-container')?.dispatchEvent(event);
    console.log('Snippets carousel resumed');
};

// Function to get current slide info
window.getCurrentSnippet = function() {
    const activeSlide = document.querySelector('.snippet-slide.active');
    if (activeSlide) {
        const title = activeSlide.querySelector('h3')?.textContent || 'Unknown';
        const language = activeSlide.querySelector('.snippet-language')?.textContent || 'Unknown';
        console.log(`Current snippet: ${title} (${language.trim()})`);
        return { title, language };
    }
    return null;
};