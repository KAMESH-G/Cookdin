'use strict';

// Wait until the DOM is fully loaded before accessing any elements
document.addEventListener('DOMContentLoaded', function () {
  
  // Food animations with improved performance
  const initFoodAnimations = function() {
    const foodImages = document.querySelectorAll('.food-img');
    
    if (foodImages.length === 0) return;
    
    let positions = {
      'food-1': { x: 0, y: 0, rotation: 0 },
      'food-2': { x: 0, y: 0, rotation: 0 },
      'food-3': { x: 0, y: 0, rotation: 0 }
    };
    
    let ticking = false;
    
    function updatePosition() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollFactor = scrollTop / (windowHeight * 2); // Reduced sensitivity
      
      foodImages.forEach(img => {
        const classList = Array.from(img.classList);
        const foodClass = classList.find(cls => cls.startsWith('food-'));
        
        if (foodClass && positions[foodClass]) {
          switch(foodClass) {
            case 'food-1':
              // Circular pattern
              const angle = scrollFactor * Math.PI;
              positions[foodClass].x = Math.sin(angle) * 20;
              positions[foodClass].y = Math.cos(angle) * 20;
              positions[foodClass].rotation = scrollFactor * 15;
              break;
              
            case 'food-2':
              // Wave pattern
              positions[foodClass].y = Math.sin(scrollFactor * 2) * 25;
              positions[foodClass].x = Math.cos(scrollFactor * 1.5) * 15;
              positions[foodClass].rotation = -scrollFactor * 10;
              break;
              
            case 'food-3':
              // Figure-8 pattern
              positions[foodClass].x = Math.sin(scrollFactor * 3) * 20;
              positions[foodClass].y = Math.sin(scrollFactor * 1.5) * Math.cos(scrollFactor * 1.5) * 30;
              positions[foodClass].rotation = scrollFactor * 20;
              break;
          }
          
          img.style.transform = `translate3d(${positions[foodClass].x}px, ${positions[foodClass].y}px, 0) rotate(${positions[foodClass].rotation}deg)`;
        }
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    }
    
    // Add CSS transition for smooth movement
    foodImages.forEach(img => {
      img.style.transition = 'transform 0.1s ease-out';
      img.style.willChange = 'transform';
    });
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick, { passive: true });
    updatePosition(); // Initial position
  };

  // Parallax effect for shapes with performance optimization
  const initParallaxShapes = function() {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;
    
    let ticking = false;
    
    function updateShapes() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      shapes.forEach((shape, index) => {
        const speed = 0.03 + (index * 0.01); // Reduced speed
        const yPos = -scrollTop * speed;
        const rotation = scrollTop * 0.02; // Reduced rotation
        
        shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateShapes);
        ticking = true;
      }
    }
    
    // Set up shapes for performance
    shapes.forEach(shape => {
      shape.style.willChange = 'transform';
    });
    
    window.addEventListener('scroll', requestTick, { passive: true });
  };

  // Mouse follow effect for the glow
  const initGlowEffect = function() {
    const glow = document.querySelector('.glow');
    if (!glow) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    function updateGlow() {
      // Smooth following effect
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      
      glow.style.transform = `translate(${glowX - glow.offsetWidth/2}px, ${glowY - glow.offsetHeight/2}px)`;
      requestAnimationFrame(updateGlow);
    }
    
    updateGlow();
  };

  // Form handling with validation
  const initFormHandling = function() {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const registrationForm = document.getElementById('registrationForm');
    
    // Get started button
    if (getStartedBtn && registrationForm) {
      getStartedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registrationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
    
    // Form submission
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const orgNameInput = document.querySelector('.form-input');
        const orgTypeInput = document.querySelector('input[name="org-type"]:checked');
        
        // Validation
        if (!orgNameInput || !orgNameInput.value.trim()) {
          alert('Please enter your organization name');
          orgNameInput?.focus();
          return;
        }
        
        if (!orgTypeInput) {
          alert('Please select your organization type');
          return;
        }
        
        // Success message
        alert('Thank you for registering! We will contact you soon.');
        
        // Reset form
        if (orgNameInput) orgNameInput.value = '';
        document.querySelectorAll('input[name="org-type"]').forEach(radio => {
          radio.checked = false;
        });
      });
    }
    
    // Cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const orgNameInput = document.querySelector('.form-input');
        if (orgNameInput) orgNameInput.value = '';
        
        document.querySelectorAll('input[name="org-type"]').forEach(radio => {
          radio.checked = false;
        });
      });
    }
    
    // Upload button
    if (uploadBtn) {
      uploadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create file input dynamically
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', function(e) {
          const file = e.target.files[0];
          if (file) {
            alert(`File selected: ${file.name}`);
            // Handle file upload here
          }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
      });
    }
  };
  
  // Scroll reveal animations
  const initScrollRevealAnimations = function() {
    const animatedElements = document.querySelectorAll('.section-title, .feature-card, .cta-btn, .hero-text, .section-description');
    
    if (animatedElements.length === 0) return;
    
    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };
    
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .section-title, .feature-card, .cta-btn, .hero-text, .section-description {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };
  
  // Parallax backgrounds
  const initParallaxBackgrounds = function() {
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    if (parallaxSections.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrollPosition = window.pageYOffset;
      
      parallaxSections.forEach(section => {
        const speed = parseFloat(section.dataset.speed) || 0.5;
        const yPos = -(scrollPosition * speed);
        section.style.backgroundPosition = `50% ${yPos}px`;
      });
      
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  };
  
  // Smooth scrolling for anchor links
  const initSmoothScrolling = function() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Animated counters
  const initScrollCounters = function() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    const animateCounter = (counter, target) => {
      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            animateCounter(counter, target);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  };
  
  // Scroll progress bar
  const initScrollProgressBar = function() {
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      
      Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        width: '0',
        backgroundColor: '#3fd92a',
        zIndex: '9999',
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none'
      });
      
      document.body.appendChild(progressBar);
    }
    
    let ticking = false;
    
    function updateProgress() {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min((window.pageYOffset / scrollTotal) * 100, 100);
      progressBar.style.width = `${scrollProgress}%`;
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
  };
  
  // Sticky header
  const initStickyHeader = function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let isSticky = false;
    
    const addStickyStyles = () => {
      if (isSticky) return;
      
      const style = document.createElement('style');
      style.id = 'sticky-header-styles';
      style.innerHTML = `
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        
        header.sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          animation: slideDown 0.3s ease-out;
          transition: all 0.3s ease;
        }
      `;
      
      if (!document.getElementById('sticky-header-styles')) {
        document.head.appendChild(style);
      }
    };
    
    function updateHeader() {
      if (window.scrollY > 100) {
        if (!isSticky) {
          header.classList.add('sticky');
          addStickyStyles();
          isSticky = true;
        }
      } else {
        if (isSticky) {
          header.classList.remove('sticky');
          isSticky = false;
        }
      }
    }
    
    window.addEventListener('scroll', updateHeader, { passive: true });
  };
  
  // Back to top button
  const initBackToTopButton = function() {
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.className = 'back-to-top';
      backToTopBtn.innerHTML = '↑';
      backToTopBtn.setAttribute('aria-label', 'Back to top');
      
      Object.assign(backToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#3fd92a',
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
        zIndex: '999',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      });
      
      document.body.appendChild(backToTopBtn);
    }
    
    function updateVisibility() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    }
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
      backToTopBtn.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
      backToTopBtn.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', updateVisibility, { passive: true });
  };
  
  // Image zoom on scroll
  const initImageZoomOnScroll = function() {
    const images = document.querySelectorAll('.zoom-on-scroll');
    if (images.length === 0) return;
    
    images.forEach(img => {
      img.style.transform = 'scale(0.95)';
      img.style.transition = 'transform 0.6s ease-out';
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1)';
          } else {
            entry.target.style.transform = 'scale(0.95)';
          }
        });
      },
      { threshold: 0.2 }
    );
    
    images.forEach(img => observer.observe(img));
  };

  // Initialize all components
  try {
    initFoodAnimations();
    initParallaxShapes();
    initGlowEffect();
    initFormHandling();
    initScrollRevealAnimations();
    initParallaxBackgrounds();
    initSmoothScrolling();
    initScrollCounters();
    initScrollProgressBar();
    initStickyHeader();
    initBackToTopButton();
    initImageZoomOnScroll();
    
    console.log('All components initialized successfully');
  } catch (error) {
    console.error('Error initializing components:', error);
  }
});
