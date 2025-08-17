// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Select all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent triggering the parent hover

            // Get the email address text
            const email = this.parentElement.textContent.trim().replace('📋', '').trim();

            // Create a temporary textarea to copy the email
            const textarea = document.createElement('textarea');
            textarea.value = email;
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile devices

            try {
                // Copy the text
                const successful = document.execCommand('copy');
                if (successful) {
                    // Optionally, provide feedback to the user
                    this.textContent = '✓ Copied!';
                    setTimeout(() => {
                        this.textContent = '📋';
                    }, 2000);
                } else {
                    throw new Error('Copy command was unsuccessful');
                }
            } catch (err) {
                console.error('Failed to copy email:', err);
            }

            // Remove the temporary textarea
            document.body.removeChild(textarea);
        });
    });

    // Timeline Animation on Scroll
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (timelineItems.length === 0) return; // Exit if no timeline items found
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to check if element is entering viewport (more generous trigger)
        function isEnteringViewport(element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // Trigger animation when element is 70% into the viewport (faster trigger)
            return (
                rect.top < windowHeight * 0.8 &&
                rect.bottom > 0
            );
        }
        
        // Function to animate timeline items
        function animateTimelineItems() {
            timelineItems.forEach((item, index) => {
                if (isEnteringViewport(item) && !item.classList.contains('animate')) {
                    // Reduced delay for faster appearance
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100); // Reduced from 200ms to 100ms
                }
            });
        }
        
        // Initial check when page loads
        animateTimelineItems();
        
        // Listen for scroll events
        let ticking = false;
        
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    animateTimelineItems();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        
        // Also trigger on window resize
        window.addEventListener('resize', animateTimelineItems);
        
        // Parallax effect for timeline items (optional enhancement)
        function addParallaxEffect() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            timelineItems.forEach((item, index) => {
                if (isPartiallyInViewport(item)) {
                    const speed = 0.1; // Adjust for more/less parallax effect
                    const yPos = -(scrollTop * speed);
                    const card = item.querySelector('.timeline-card');
                    if (card) {
                        card.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        }
        
        // Optional: Enable parallax effect
        // window.addEventListener('scroll', addParallaxEffect);
    }
    
    // Initialize timeline animation
    initTimelineAnimation();
});