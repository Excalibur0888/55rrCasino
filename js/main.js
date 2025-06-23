// Main JavaScript for 55rr Casino website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const isOpen = mainNav.classList.contains('active');
            menuToggle.innerHTML = isOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }

    // Initialize game card hover effects
    initGameCardEffects();
    
    // Add shimmer effect to CTA buttons
    addShimmerEffect();
    
    // Ticker animation pause on hover
    initTickerHover();
    
    // FAQ toggles (for payment and bonus pages)
    initFaqToggles();
    
    // Animate numbers (for statistics and promotions)
    animateNumbers();
    
    // Floating button pulse effect
    initFloatingButton();
    
    // Initialize sidebar category filtering
    initSidebarFilters();
    
    // Initialize game tabs filtering on games page
    initGameTabFilters();

    // Initialize search functionality
    initSearchBox();
});

// Search box functionality
function initSearchBox() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const categoryLinks = document.querySelectorAll('.sidebar .categories li a');
    
    if (searchInput) {
        // Input event for real-time filtering
        searchInput.addEventListener('input', function() {
            filterCategories(this.value);
        });
        
        // Button click event
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                filterCategories(searchInput.value);
            });
        }
        
        // Enter key press event
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterCategories(this.value);
            }
        });
        
        // Function to filter categories
        function filterCategories(searchTerm) {
            searchTerm = searchTerm.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all categories if search is empty
                categoryLinks.forEach(link => {
                    link.parentElement.style.display = '';
                });
                return;
            }
            
            // Filter categories based on search term
            categoryLinks.forEach(link => {
                const categoryText = link.querySelector('span:first-of-type').textContent.toLowerCase();
                if (categoryText.includes(searchTerm)) {
                    link.parentElement.style.display = '';
                } else {
                    link.parentElement.style.display = 'none';
                }
            });
        }
    }
}

// Game card hover effects
function initGameCardEffects() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
            this.style.borderColor = '#ffc107';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
}

// Add shimmer effect to CTA buttons only (not to payment icons)
function addShimmerEffect() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.closest('.payment-icon')) { // Don't add effect to payment icons
                this.style.position = 'relative';
                
                const shimmer = document.createElement('span');
                shimmer.classList.add('btn-shimmer');
                shimmer.style.position = 'absolute';
                shimmer.style.top = '0';
                shimmer.style.left = '-100%';
                shimmer.style.width = '100%';
                shimmer.style.height = '100%';
                shimmer.style.background = 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)';
                shimmer.style.transform = 'skewX(-25deg)';
                shimmer.style.animation = 'shimmerBtn 1s';
                
                this.appendChild(shimmer);
                
                setTimeout(() => {
                    shimmer.remove();
                }, 1000);
            }
        });
    });
    
    // Add shimmer animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmerBtn {
            0% { left: -100%; }
            100% { left: 150%; }
        }
    `;
    document.head.appendChild(style);
}

// Ticker animation pause on hover
function initTickerHover() {
    const ticker = document.querySelector('.ticker-wrapper');
    
    if (ticker) {
        ticker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        ticker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// FAQ toggles - improved with direct toggle targeting
function initFaqToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
            });
        }
    });
    
    // Ensure the first FAQ item starts closed rather than open
    // This allows users to see that items are clickable
    if (faqItems.length > 0 && document.querySelector('.faq-section')) {
        // Make sure all FAQ items start closed
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Animate numbers
function animateNumbers() {
    const numberElements = document.querySelectorAll('.animate-number');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetNumber = parseInt(el.getAttribute('data-target'), 10);
                const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
                
                animateSingleNumber(el, targetNumber, duration);
                observer.unobserve(el);
            }
        });
    }, observerOptions);
    
    numberElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate single number
function animateSingleNumber(el, targetNumber, duration) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = Math.floor(progress * (targetNumber - startValue) + startValue);
            
            el.textContent = currentValue.toLocaleString();
            requestAnimationFrame(updateNumber);
        } else {
            el.textContent = targetNumber.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Floating button effect
function initFloatingButton() {
    const fab = document.querySelector('.fab');
    
    if (fab) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                fab.style.opacity = '1';
                fab.style.transform = 'translateY(0)';
            } else {
                fab.style.opacity = '0';
                fab.style.transform = 'translateY(20px)';
            }
        });
        
        // Initial check
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(20px)';
        }
    }
}

// Copy bonus code functionality
function copyBonusCode(codeElement) {
    const code = codeElement.textContent.trim();
    
    navigator.clipboard.writeText(code).then(() => {
        const originalText = codeElement.nextElementSibling.textContent;
        codeElement.nextElementSibling.textContent = 'Copied!';
        
        setTimeout(() => {
            codeElement.nextElementSibling.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Improved sidebar category filtering functionality
function initSidebarFilters() {
    const categoryLinks = document.querySelectorAll('.sidebar .categories li a');
    const allGameCards = document.querySelectorAll('.game-card');
    
    if (categoryLinks.length > 0 && allGameCards.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                categoryLinks.forEach(categoryLink => {
                    categoryLink.classList.remove('active-category');
                });
                
                // Add active class to clicked link
                this.classList.add('active-category');
                
                // Get category from link text
                const category = this.querySelector('span:first-of-type').textContent.trim().toLowerCase();
                
                // Filter games based on category
                filterGamesByCategory(category);
                
                return false;
            });
        });
    }
    
    function filterGamesByCategory(category) {
        // Show loading animation for filtering
        document.querySelectorAll('.game-card').forEach(card => {
            card.style.opacity = '0.5';
            card.style.transition = 'all 0.3s ease';
        });
        
        setTimeout(() => {
            if (category === 'all' || category === 'hot') {
                // Show all games
                allGameCards.forEach(card => {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                });
            } else {
                // Filter cards
                allGameCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category') || 
                                       (card.querySelector('h4') ? card.querySelector('h4').textContent.trim().toLowerCase() : '');
                    
                    if (cardCategory.includes(category) || 
                        category === 'popular' || 
                        (category === 'jackpots' && cardCategory.includes('jackpot')) ||
                        (category === 'new' && cardCategory.includes('new'))) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        }, 300);
    }
}

// Game tabs filtering on games page
function initGameTabFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const gameCategories = document.querySelectorAll('.game-section');
    
    if (filterTabs.length > 0) {
        filterTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                filterTabs.forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Get category from tab text
                const category = this.textContent.trim().toLowerCase();
                
                // Show animation for filtering
                gameCategories.forEach(section => {
                    section.style.opacity = '0.5';
                    section.style.transition = 'opacity 0.3s ease';
                });
                
                setTimeout(() => {
                    if (category === 'all games') {
                        // Show all game sections
                        gameCategories.forEach(section => {
                            section.style.display = '';
                        });
                    } else if (category === 'slots') {
                        // Show only slots sections (for demo, first section)
                        gameCategories.forEach((section, i) => {
                            if (i === 0) {
                                section.style.display = '';
                            } else {
                                section.style.display = 'none';
                            }
                        });
                    } else if (category === 'live casino') {
                        // Show only live casino sections (for demo, second section)
                        gameCategories.forEach((section, i) => {
                            if (i === 1) {
                                section.style.display = '';
                            } else {
                                section.style.display = 'none';
                            }
                        });
                    } else {
                        // For other categories, alternate for demo purposes
                        gameCategories.forEach((section, i) => {
                            if ((i + index) % 2 === 0) {
                                section.style.display = '';
                            } else {
                                section.style.display = 'none';
                            }
                        });
                    }
                    
                    // Restore opacity
                    gameCategories.forEach(section => {
                        if (section.style.display !== 'none') {
                            section.style.opacity = '1';
                        }
                    });
                }, 300);
            });
        });
    }
}

// Add background particles effect (optional)
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(255, 215, 0, ${Math.random() * 0.2})`
        };
    }
    
    function initParticlesArray() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }
    
    function animateParticles() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animateParticles);
    }
    
    initParticlesArray();
    animateParticles();
}

// Uncomment below to enable background particles
document.addEventListener('DOMContentLoaded', initParticles); 

// DOM Elements
const sidebarCategories = document.querySelectorAll('.sidebar .categories li a');
const gameItems = document.querySelectorAll('.game-item');
const gameTabs = document.querySelectorAll('.filter-tab');
const gameContainer = document.querySelector('.games-grid');

// Initialize the ticker
function initTicker() {
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
        // Clone the ticker content to create a seamless loop
        ticker.innerHTML = ticker.innerHTML + ticker.innerHTML;
        
        // Start the animation
        ticker.style.animation = 'ticker 60s linear infinite';
    }
}

// Toggle FAQ items
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Set initial state - all closed
        if (answer) {
            answer.style.maxHeight = '0';
        }
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle answer visibility
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '0 25px 20px';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0 25px';
                }
            });
        }
    });
}

// Sidebar Category Filtering
function initCategoryFilters() {
    if (!sidebarCategories.length || !gameItems.length) return;
    
    sidebarCategories.forEach(category => {
        category.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all categories
            sidebarCategories.forEach(cat => cat.classList.remove('active-category'));
            
            // Add active class to clicked category
            category.classList.add('active-category');
            
            const filter = category.getAttribute('data-category');
            
            // Show all items if "all" is selected
            if (filter === 'all') {
                gameItems.forEach(game => {
                    game.style.display = 'block';
                });
            } else {
                // Filter items
                gameItems.forEach(game => {
                    const gameCategory = game.getAttribute('data-category');
                    
                    if (gameCategory === filter) {
                        game.style.display = 'block';
                    } else {
                        game.style.display = 'none';
                    }
                });
            }
            
            // Add animation to visible items
            setTimeout(() => {
                document.querySelectorAll('.game-item[style="display: block"]').forEach((game, index) => {
                    game.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.1}s`;
                });
            }, 100);
        });
    });
    
    // Set initial active category
    if (sidebarCategories[0]) {
        sidebarCategories[0].classList.add('active-category');
    }
}

// Game Tab Filtering
function initGameTabs() {
    if (!gameTabs.length || !gameItems.length) return;
    
    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            gameTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-filter');
            
            // Show/hide games based on filter
            if (filter === 'all') {
                gameItems.forEach(game => {
                    game.style.display = 'block';
                });
            } else {
                gameItems.forEach(game => {
                    const gameType = game.getAttribute('data-type');
                    
                    if (gameType === filter) {
                        game.style.display = 'block';
                    } else {
                        game.style.display = 'none';
                    }
                });
            }
            
            // Add staggered animation effect
            if (gameContainer) {
                gameContainer.classList.add('filtering');
                
                setTimeout(() => {
                    gameContainer.classList.remove('filtering');
                    
                    document.querySelectorAll('.game-item[style="display: block"]').forEach((game, index) => {
                        game.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.05}s`;
                    });
                }, 300);
            }
        });
    });
    
    // Set initial active tab
    if (gameTabs[0]) {
        gameTabs[0].classList.add('active');
    }
}

// Initialize copy buttons
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeText = button.previousElementSibling.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeText).then(() => {
                // Visual feedback
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 2000);
            });
        });
    });
}

// Redirect all promo buttons to the target URL
function initRedirectButtons() {
    const promoButtons = document.querySelectorAll('.btn-play, .btn-main, .btn-secondary');
    const targetUrl = 'https://negolous.com/bpMYKwMP';
    
    promoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(targetUrl, '_blank');
        });
    });
}

// Add animation to game items on scroll
function initScrollAnimations() {
    const animatedItems = document.querySelectorAll('.game-item, .blog-item, .payment-card, .promo-card, .deal-card, .vip-benefit-item, .holiday-item, .step-item');
    
    function checkScroll() {
        animatedItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.9) {
                item.classList.add('in-view');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on page load
    checkScroll();
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTicker();
    initFAQ();
    initCategoryFilters();
    initGameTabs();
    initCopyButtons();
    initRedirectButtons();
    initScrollAnimations();
    initMobileMenu();
});

// Add CSS animation classes
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.game-item, .blog-item, .payment-card, .promo-card, .deal-card, .vip-benefit-item, .holiday-item, .step-item {
    opacity: 0;
}

.game-item.in-view, .blog-item.in-view, .payment-card.in-view, .promo-card.in-view, .deal-card.in-view, .vip-benefit-item.in-view, .holiday-item.in-view, .step-item.in-view {
    animation: fadeInUp 0.6s ease forwards;
}

.games-grid.filtering .game-item {
    opacity: 0;
    transform: translateY(20px);
}

@keyframes ticker {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
`); 