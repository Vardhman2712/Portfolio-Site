document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href') === `#${current}`) {
                navItem.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form submission logic would go here
            // This is a placeholder. In a real implementation, you would connect to a backend service
            
            // Display success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for scroll-to-top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-dark);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Project card animations with Intersection Observer
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add initial styles to hide cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each project card
    projectCards.forEach(card => {
        observer.observe(card);
    });
    
    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const nameElement = heroTitle.querySelector('.highlight');
        const nameText = nameElement ? nameElement.textContent : '';
        
        if (nameElement) {
            // Set up the typing animation only for the name
            const typingDelay = 100;
            nameElement.textContent = '';
            
            let charIndex = 0;
            const typeWriter = () => {
                if (charIndex < nameText.length) {
                    nameElement.textContent += nameText.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, typingDelay);
                } else {
                    // Add a blinking cursor after typing is complete
                    nameElement.innerHTML = `${nameText}<span class="cursor">|</span>`;
                    
                    // Add cursor blinking animation
                    const cursorStyle = document.createElement('style');
                    cursorStyle.textContent = `
                        @keyframes blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                        .cursor {
                            animation: blink 1s infinite;
                        }
                    `;
                    document.head.appendChild(cursorStyle);
                    
                    // Remove cursor after a few seconds
                    setTimeout(() => {
                        const cursor = nameElement.querySelector('.cursor');
                        if (cursor) {
                            cursor.style.display = 'none';
                        }
                    }, 3000);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Theme toggle functionality
    const createThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);
        
        // Add styles for theme toggle button
        const themeToggleStyle = document.createElement('style');
        themeToggleStyle.textContent = `
            .theme-toggle {
                position: fixed;
                top: 100px;
                right: 30px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--bg-color);
                color: var(--text-color);
                border: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                cursor: pointer;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .theme-toggle:hover {
                transform: rotate(30deg);
            }
            
            body.dark-theme {
                --primary-color: #8b5cf6;
                --primary-dark: #7c3aed;
                --text-color: #e5e7eb;
                --text-light: #9ca3af;
                --bg-color: #111827;
                --bg-light: #1f2937;
                --bg-dark: #030712;
                --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
            }
            
            body.dark-theme .theme-toggle {
                color: var(--text-color);
                background-color: var(--bg-light);
            }
            
            body.dark-theme .logo h2,
            body.dark-theme .nav-links a,
            body.dark-theme .burger div {
                color: var(--text-color);
            }
            
            body.dark-theme .burger div {
                background-color: var(--text-color);
            }
            
            body.dark-theme header {
                background-color: var(--bg-color);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }
            
            body.dark-theme .form-group input,
            body.dark-theme .form-group textarea {
                background-color: var(--bg-color);
                border-color: #374151;
                color: var(--text-color);
            }
        `;
        document.head.appendChild(themeToggleStyle);
        
        // Set theme based on local storage or system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };
    
    createThemeToggle();
    
    // Image lazy loading
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
            });
        } else {
            // Fallback for browsers that don't support native lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    lazyLoadImages();
    
    // Add download functionality for resume button
    const resumeButton = document.querySelector('.download-resume');
    if (resumeButton) {
        resumeButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // In a real implementation, this would link to an actual file
            alert('Resume download functionality would be implemented here with a real file.');
            
            // Example of how to trigger a download
            // const link = document.createElement('a');
            // link.href = 'path/to/your/resume.pdf';
            // link.download = 'YourName_Resume.pdf';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        });
    }
});