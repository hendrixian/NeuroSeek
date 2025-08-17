 // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Course filtering functionality
        const languageFilter = document.getElementById('languageFilter');
        const levelFilter = document.getElementById('levelFilter');
        const priceFilter = document.getElementById('priceFilter');
        const searchInput = document.getElementById('searchInput');
        const filterTags = document.querySelectorAll('.filter-tag');
        const coursesGrid = document.getElementById('coursesGrid');
        const allCourses = document.querySelectorAll('.course-card');

        // Filter state
        let currentFilters = {
            language: '',
            level: '',
            price: '',
            tag: 'all',
            search: ''
        };

        // Filter courses function
        function filterCourses() {
            allCourses.forEach(course => {
                let shouldShow = true;

                // Language filter
                if (currentFilters.language && course.dataset.language !== currentFilters.language) {
                    shouldShow = false;
                }

                // Level filter
                if (currentFilters.level && course.dataset.level !== currentFilters.level) {
                    shouldShow = false;
                }

                // Price filter
                if (currentFilters.price) {
                    const coursePrice = course.dataset.price;
                    if (currentFilters.price === 'free' && coursePrice !== 'free') {
                        shouldShow = false;
                    } else if (currentFilters.price === 'paid' && coursePrice === 'free') {
                        shouldShow = false;
                    } else if (currentFilters.price === 'premium' && coursePrice !== 'premium') {
                        shouldShow = false;
                    }
                }

                // Tag filter
                if (currentFilters.tag !== 'all') {
                    const courseTags = course.dataset.tags || '';
                    if (!courseTags.includes(currentFilters.tag)) {
                        shouldShow = false;
                    }
                }

                // Search filter
                if (currentFilters.search) {
                    const courseText = course.textContent.toLowerCase();
                    if (!courseText.includes(currentFilters.search.toLowerCase())) {
                        shouldShow = false;
                    }
                }

                // Show/hide course
                if (shouldShow) {
                    course.style.display = 'block';
                    course.classList.add('animate-on-scroll');
                } else {
                    course.style.display = 'none';
                }
            });

            // Check if no courses are visible
            const visibleCourses = Array.from(allCourses).filter(course => course.style.display !== 'none');
            if (visibleCourses.length === 0) {
                showEmptyState();
            } else {
                hideEmptyState();
            }
        }

        // Show empty state
        function showEmptyState() {
            const existingEmptyState = document.querySelector('.empty-state');
            if (!existingEmptyState) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <h3>No courses found</h3>
                    <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                `;
                coursesGrid.appendChild(emptyState);
            }
        }

        // Hide empty state
        function hideEmptyState() {
            const emptyState = document.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
        }

        // Event listeners for filters
        languageFilter.addEventListener('change', (e) => {
            currentFilters.language = e.target.value;
            filterCourses();
        });

        levelFilter.addEventListener('change', (e) => {
            currentFilters.level = e.target.value;
            filterCourses();
        });

        priceFilter.addEventListener('change', (e) => {
            currentFilters.price = e.target.value;
            filterCourses();
        });

        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            filterCourses();
        });

        // Filter tags functionality
        filterTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                e.target.classList.add('active');
                
                currentFilters.tag = e.target.dataset.filter;
                filterCourses();
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all course cards
        allCourses.forEach(card => {
            observer.observe(card);
        });

        // Header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });

        // Progress bar animation for free courses
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            // Simulate progress (in real app, this would come from user data)
            const randomProgress = Math.random() * 100;
            setTimeout(() => {
                bar.style.width = randomProgress + '%';
            }, 1000);
        });

        // Course card hover effects
        allCourses.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });

        // Clear all filters function
        function clearAllFilters() {
            currentFilters = {
                language: '',
                level: '',
                price: '',
                tag: 'all',
                search: ''
            };
            
            languageFilter.value = '';
            levelFilter.value = '';
            priceFilter.value = '';
            searchInput.value = '';
            
            filterTags.forEach(tag => tag.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            
            filterCourses();
        }

        // Add clear filters button (optional)
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Filters';
        clearButton.className = 'btn btn-outline';
        clearButton.style.marginLeft = '1rem';
        clearButton.addEventListener('click', clearAllFilters);
        
        // Add to filter container (uncomment if you want a clear button)
        // document.querySelector('.filter-group').appendChild(clearButton);