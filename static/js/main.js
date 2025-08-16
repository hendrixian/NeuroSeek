document.addEventListener('DOMContentLoaded', function() {
    // Main app controller
    const App = {
        init() {
            this.setupSmoothScrolling();
            this.setupHeaderEffects();
            this.setupScrollAnimations();
            this.setupStatsCounter();
            this.setupHoverEffects();
            this.setupMobileMenu();
        },

        // 1. Smooth scrolling with offset for fixed header
        setupSmoothScrolling() {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const scrollOffset = headerHeight + 20; // 20px additional spacing
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - scrollOffset,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without jumping
                        history.pushState(null, null, targetId);
                    }
                });
            });
        },

        // 2. Dynamic header effects
        setupHeaderEffects() {
            const header = document.querySelector('header');
            if (!header) return;
            
            const updateHeader = () => {
                const scrollClass = 'scrolled';
                const scrollY = window.scrollY;
                
                if (scrollY > 100) {
                    header.classList.add(scrollClass);
                    header.style.setProperty('--header-opacity', '0.95');
                } else {
                    header.classList.remove(scrollClass);
                    header.style.setProperty('--header-opacity', '1');
                }
            };
            
            // Initial check and then on scroll
            updateHeader();
            window.addEventListener('scroll', updateHeader);
        },

        // 3. Scroll animations with IntersectionObserver
        setupScrollAnimations() {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            if (animateElements.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animateElements.forEach(el => observer.observe(el));
        },

        // 4. Stats counter animation
        setupStatsCounter() {
            const statsSection = document.querySelector('.stats');
            if (!statsSection) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounters(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        },
        
        animateCounters(container) {
            const counters = container.querySelectorAll('.stat-item h3');
            
            counters.forEach(counter => {
                const text = counter.textContent;
                const target = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d]/g, '');
                const duration = 2000;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const value = Math.floor(progress * target);
                    
                    counter.textContent = value + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        },

        // 5. Hover effects with touch device detection
        setupHoverEffects() {
            const hasHover = !window.matchMedia('(hover: none)').matches;
            
            if (hasHover) {
                // Feature cards hover
                document.querySelectorAll('.feature-card').forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        card.style.transform = 'translateY(-10px) scale(1.02)';
                    });
                    
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = '';
                    });
                });
                
                // Language flags hover
                document.querySelectorAll('.language-item').forEach(item => {
                    const flag = item.querySelector('.flag');
                    
                    item.addEventListener('mouseenter', () => {
                        flag.style.transform = 'scale(1.1) rotateY(10deg)';
                        flag.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                    });
                    
                    item.addEventListener('mouseleave', () => {
                        flag.style.transform = '';
                        flag.style.boxShadow = '';
                    });
                });
            }
        },

        // 6. Mobile menu functionality
        setupMobileMenu() {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            menuBtn.setAttribute('aria-expanded', 'false');
            
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            if (!nav || !navLinks) return;
            
            nav.appendChild(menuBtn);
            
            menuBtn.addEventListener('click', () => {
                const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                menuBtn.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
                
                // Toggle body scroll when menu is open
                document.body.style.overflow = isExpanded ? '' : 'hidden';
            });
            
            // Close menu when clicking on links
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    // Initialize the app
    App.init();
});