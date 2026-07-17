/**
 * SHUBHAM ENGINEERING WORKS - INTERACTIVE SCRIPT
 * Functionality: Mobile Menu, Scroll Spy, WhatsApp Form Submission, Vanilla Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE NAVIGATION MENU
    // ==========================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }
    
    function openMobileMenu() {
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    }
    
    function closeMobileMenu() {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }


    // ==========================================
    // 2. SCROLL SPY & ACTIVE NAVBAR HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 100; // Offset for sticky header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);


    // ==========================================
    // 3. WHATSAPP FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('whatsapp-inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('contact-name');
            const phoneInput = document.getElementById('contact-phone');
            const serviceSelect = document.getElementById('contact-service');
            const messageTextarea = document.getElementById('contact-message');
            
            let isValid = true;
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, true);
                isValid = false;
            } else {
                showError(nameInput, false);
            }
            
            // Validate Phone (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            const cleanPhone = phoneInput.value.replace(/\s+/g, '').replace(/-/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                showError(phoneInput, true);
                isValid = false;
            } else {
                showError(phoneInput, false);
            }
            
            // Validate Service Selection
            if (!serviceSelect.value) {
                showError(serviceSelect, true);
                isValid = false;
            } else {
                showError(serviceSelect, false);
            }
            
            // Redirect on success
            if (isValid) {
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                const service = serviceSelect.value;
                const userMsg = messageTextarea.value.trim() ? messageTextarea.value.trim() : 'None';
                
                // Formulate WhatsApp message text with clean formatting
                const message = `Hi Shubham Engineering Works, I would like to inquire about steel fabrication.

*Name:* ${name}
*Phone:* ${phone}
*Service:* ${service}
*Message:* ${userMsg}`;
                
                // Open WhatsApp link (target mobile/WhatsApp Web automatically)
                const waUrl = `https://wa.me/918409938796?text=${encodeURIComponent(message)}`;
                window.open(waUrl, '_blank');
                
                // Clear the form
                contactForm.reset();
            }
        });
    }
    
    function showError(inputElement, show) {
        const formGroup = inputElement.closest('.form-group');
        if (show) {
            formGroup.classList.add('invalid');
        } else {
            formGroup.classList.remove('invalid');
        }
    }


    // ==========================================
    // 4. CUSTOM VANILLA LIGHTBOX FOR GALLERY
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxMediaBox = document.querySelector('.lightbox-media-box');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    
    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const type = item.getAttribute('data-type');
                const src = item.getAttribute('data-src');
                
                let captionText = item.getAttribute('data-caption') || '';
                if (!captionText) {
                    const imgEl = item.querySelector('img');
                    if (imgEl) {
                        captionText = imgEl.getAttribute('alt') || '';
                    }
                }
                
                openLightbox(type, src, captionText);
            });
            
            // Support enter key on focused items
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    item.click();
                }
            });
        });
        
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on clicking outside the media
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }
    
    function openLightbox(type, src, captionText) {
        lightboxMediaBox.innerHTML = ''; // Clear previous media
        
        if (type === 'video') {
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            video.loop = true;
            lightboxMediaBox.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = src;
            img.alt = captionText;
            lightboxMediaBox.appendChild(img);
        }
        
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Keep body locked
    }
    
    function closeLightbox() {
        // Pause any running videos inside the lightbox before closing
        const video = lightboxMediaBox.querySelector('video');
        if (video) {
            video.pause();
        }
        
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling
    }


    // ==========================================
    // 5. LIGHTWEIGHT ON-SCROLL ANIMATION (REVEAL)
    // ==========================================
    const revealSections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of section is visible
    });
    
    revealSections.forEach(section => {
        section.classList.add('section-reveal');
        revealObserver.observe(section);
    });
});
