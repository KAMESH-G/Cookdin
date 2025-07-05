'use strict';

// Wait until the DOM is fully loaded before accessing any elements
document.addEventListener('DOMContentLoaded', function () {
  // Setup testimonials
  const initTestimonials = function() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (track && cards.length > 0) {
      // Add event to restart animation when it completes
      track.addEventListener('animationiteration', () => {
          // This keeps the animation running smoothly across iterations
          console.log('Animation iteration completed');
      });
      
      // Optional: Add interaction tracking
      cards.forEach(card => {
          card.addEventListener('click', () => {
              console.log('Testimonial clicked', card.querySelector('.author-name')?.textContent);
          });
      });
    }
  };

  // Food animations
  const initFoodAnimations = function() {
    // Get all the food images
    const foodImages = document.querySelectorAll('.food-img');
    
    if (foodImages.length > 0) {
      // Set initial positions
      let positions = {
        'food-1': { x: 0, y: 0, rotation: 0 },
        'food-2': { x: 0, y: 0, rotation: 0 },
        'food-3': { x: 0, y: 0, rotation: 0 }
      };
      
      // Function to update element position based on scroll
      function updatePosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollFactor = scrollTop / windowHeight;
        
        // Update each food image position
        foodImages.forEach(img => {
          const classNames = img.className.split(' ');
          let foodClass = '';
          
          // Find which food class this image has
          for (let className of classNames) {
            if (className.startsWith('food-')) {
              foodClass = className;
              break;
            }
          }
          
          if (foodClass) {
            // Apply different animations for each food item
            if (foodClass === 'food-1') {
              // Food 1 moves in a circular pattern
              const circleRadius = 30;
              const angle = scrollFactor * 2 * Math.PI;
              positions[foodClass].x = Math.sin(angle) * circleRadius;
              positions[foodClass].y = Math.cos(angle) * circleRadius;
              positions[foodClass].rotation = scrollFactor * 20;
            } else if (foodClass === 'food-2') {
              // Food 2 moves up and down
              positions[foodClass].y = Math.sin(scrollFactor * 3) * 40;
              positions[foodClass].x = Math.cos(scrollFactor * 2) * 20;
              positions[foodClass].rotation = -scrollFactor * 15;
            } else if (foodClass === 'food-3') {
              // Food 3 moves in a figure-8 pattern
              positions[foodClass].x = Math.sin(scrollFactor * 4) * 25;
              positions[foodClass].y = Math.sin(scrollFactor * 2) * Math.cos(scrollFactor * 2) * 40;
              positions[foodClass].rotation = scrollFactor * 30;
            }
            
            // Apply the transforms
            img.style.transform = `translate(${positions[foodClass].x}px, ${positions[foodClass].y}px) rotate(${positions[foodClass].rotation}deg)`;
          }
        });
      }
      
      // Add transition effect to food images
      foodImages.forEach(img => {
        img.style.transition = 'transform 0.3s ease-out';
      });
      
      // Add scroll event listener
      window.addEventListener('scroll', updatePosition);
      
      // Run once on load to set initial positions
      updatePosition();
    }
    
    // Parallax effect for shapes
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length > 0) {
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        shapes.forEach((shape, index) => {
          // Different parallax speed for each shape
          const speed = 0.05 + (index * 0.02);
          const yPos = -scrollTop * speed;
          shape.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.05}deg)`;
        });
      });
    }
  };

  // Testimonial card animations
  const initTestimonialAnimations = function() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    // Apply staggered animation to testimonial cards
    testimonials.forEach((card, index) => {
      card.style.animation = `fadeIn 0.8s ease-out ${0.2 + index * 0.2}s forwards`;
    });
    
    // Add hover effect to testimonial cards
    testimonials.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.08)';
        card.style.borderColor = 'rgba(63, 217, 42, 0.4)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.06)';
        card.style.borderColor = '#eee';
      });
    });
  };

  // Mouse follow effect for the glow
  const initGlowEffect = function() {
    const glow = document.querySelector('.glow');
    
    if (glow) {
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Add some delay for a more natural feel
        setTimeout(() => {
          glow.style.top = `${y}px`;
          glow.style.left = `${x}px`;
          glow.style.transform = 'translate(-50%, -50%)';
        }, 100);
      });
    }
  };

  // Form handling
  const initFormHandling = function() {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const registrationForm = document.getElementById('registrationForm');
    
    if (getStartedBtn && registrationForm) {
      // Get started button scrolls to form or makes it visible
      getStartedBtn.addEventListener('click', function() {
        registrationForm.scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    if (confirmBtn) {
      // Form submission handling
      confirmBtn.addEventListener('click', function() {
        // Get form values
        const orgName = document.querySelector('.form-input')?.value;
        const orgType = document.querySelector('input[name="org-type"]:checked');
        
        // Simple validation
        if (!orgName?.trim()) {
          alert('Please enter your organization name');
          return;
        }
        
        if (!orgType) {
          alert('Please select your organization type');
          return;
        }
        
        // Form submission logic would go here
        alert('Thank you for registering! We will contact you soon.');
        
        // Reset form
        if (document.querySelector('.form-input')) {
          document.querySelector('.form-input').value = '';
        }
        document.querySelectorAll('input[name="org-type"]').forEach(radio => {
          radio.checked = false;
        });
      });
    }
    
    if (cancelBtn) {
      // Cancel button
      cancelBtn.addEventListener('click', function() {
        // Reset form
        if (document.querySelector('.form-input')) {
          document.querySelector('.form-input').value = '';
        }
        document.querySelectorAll('input[name="org-type"]').forEach(radio => {
          radio.checked = false;
        });
      });
    }
    
    if (uploadBtn) {
      // Upload button
      uploadBtn.addEventListener('click', function() {
        // In a real implementation, this would trigger a file input
        alert('File upload functionality would be implemented here');
      });
    }
  };
  
  // Scroll reveal animations for elements
  const initScrollRevealAnimations = function() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.section-title, .feature-card, .cta-btn, .hero-text, .section-description');
    
    // Options for IntersectionObserver
    const options = {
      root: null, // viewport as root
      rootMargin: '0px',
      threshold: 0.1 // trigger when 10% of the element is visible
    };
    
    // Callback function when elements intersect
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the visible class to trigger animation
          entry.target.classList.add('visible');
          
          // Stop observing this element
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Create observer
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Setup default styles for elements
    animatedElements.forEach(element => {
      // Set initial state (invisible and translated)
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      // Add CSS for the visible state
      const style = document.createElement('style');
      style.innerHTML = `
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
      
      // Start observing
      observer.observe(element);
    });
  };
  
  // Parallax background effect
  const initParallaxBackgrounds = function() {
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    
    if (parallaxSections.length > 0) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        parallaxSections.forEach(section => {
          // Get the speed from data attribute or default to 0.5
          const speed = section.dataset.speed || 0.5;
          
          // Calculate new background position
          const yPos = -(scrollPosition * speed);
          
          // Apply the background position
          section.style.backgroundPosition = `50% ${yPos}px`;
        });
      });
    }
  };
  
  // Smooth scrolling for all anchor links
  const initSmoothScrolling = function() {
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 60, // Offset for fixed headers
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState(null, null, targetId);
        }
      });
    });
  };
  
  // Scroll-triggered counter animation
  const initScrollCounters = function() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
      // Options for IntersectionObserver
      const options = {
        threshold: 0.5 // Trigger when 50% visible
      };
      
      // Counter animation function
      const animateCounter = (counter, target) => {
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // Update every 16ms
        
        const updateCounter = () => {
          current += increment;
          counter.textContent = Math.floor(current);
          
          if (current < target) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      };
      
      // Intersection observer callback
      const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            
            // Only animate once
            observer.unobserve(counter);
          }
        });
      };
      
      // Create observer and observe counters
      const observer = new IntersectionObserver(handleIntersection, options);
      counters.forEach(counter => {
        observer.observe(counter);
      });
    }
  };
  
  // Scroll progress indicator
  const initScrollProgressBar = function() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
      });
    } else {
      // Create progress bar if it doesn't exist
      const newProgressBar = document.createElement('div');
      newProgressBar.className = 'scroll-progress';
      newProgressBar.style.position = 'fixed';
      newProgressBar.style.top = '0';
      newProgressBar.style.left = '0';
      newProgressBar.style.height = '4px';
      newProgressBar.style.width = '0';
      newProgressBar.style.backgroundColor = '#3fd92a';
      newProgressBar.style.zIndex = '9999';
      newProgressBar.style.transition = 'width 0.1s ease-out';
      
      document.body.appendChild(newProgressBar);
      
      // Add event listener
      window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        
        newProgressBar.style.width = `${scrollProgress}%`;
      });
    }
  };
  
  // Sticky header that changes on scroll
  const initStickyHeader = function() {
    const header = document.querySelector('header');
    
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('sticky');
          // Add animation effect
          header.style.animation = 'slideDown 0.5s forwards';
        } else {
          header.classList.remove('sticky');
          header.style.animation = 'none';
        }
      });
      
      // Add CSS for sticky header animation
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        header.sticky {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 10px 0;
          transition: all 0.3s ease;
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // Back to top button that appears on scroll
  const initBackToTopButton = function() {
    // Create button if it doesn't exist
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
      backToTopBtn = document.createElement('button');
      backToTopBtn.className = 'back-to-top';
      backToTopBtn.innerHTML = '↑';
      backToTopBtn.style.position = 'fixed';
      backToTopBtn.style.bottom = '20px';
      backToTopBtn.style.right = '20px';
      backToTopBtn.style.width = '40px';
      backToTopBtn.style.height = '40px';
      backToTopBtn.style.borderRadius = '50%';
      backToTopBtn.style.backgroundColor = '#3fd92a';
      backToTopBtn.style.color = 'white';
      backToTopBtn.style.border = 'none';
      backToTopBtn.style.fontSize = '20px';
      backToTopBtn.style.cursor = 'pointer';
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.transition = 'opacity 0.3s ease';
      backToTopBtn.style.zIndex = '999';
      
      document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
      } else {
        backToTopBtn.style.opacity = '0';
      }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  // Zoom effect on scroll for images
  const initImageZoomOnScroll = function() {
    const images = document.querySelectorAll('.zoom-on-scroll');
    
    if (images.length > 0) {
      // Set initial styles
      images.forEach(img => {
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'transform 0.5s ease-out';
      });
      
      // Create intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.transform = 'scale(1)';
            } else {
              entry.target.style.transform = 'scale(0.9)';
            }
          });
        },
        { threshold: 0.3 }
      );
      
      // Observe each image
      images.forEach(img => {
        observer.observe(img);
      });
    }
  };

  // Initialize all components (removed partner section initialization)
  initTestimonials();
  initFoodAnimations();
  initTestimonialAnimations();
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
});