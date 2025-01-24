document.addEventListener('DOMContentLoaded', function() {
    // Select all divs with the data-bg-img attribute
    const bgDivs = document.querySelectorAll('[data-bg-img]');
    
    // Iterate over each div and set the background image
    bgDivs.forEach(div => {
        const bgImg = div.getAttribute('data-bg-img');
        
        if (bgImg) {
            // Set both the background image and gradient
            div.style.background = `url(${bgImg})`;
            div.style.backgroundSize = 'cover'; // Ensure both layers cover the div
            div.style.backgroundPosition = 'center'; // Center the image
            div.style.zIndex = '999'; // Optional: Adjust the stacking order
        }
    });
});



const faqQuestions = document.querySelectorAll('.faq__question');

// Set the first item active by default
const firstAnswer = document.querySelector('.faq__answer.active');
if (firstAnswer) {
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px'; // Set height dynamically
}

// Add click event listeners for toggle
faqQuestions.forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.closest('.faq__item'); // Get the parent .faq__item
        const answer = faqItem.querySelector('.faq__answer');

        // Close other answers and remove active class from other questions
        document.querySelectorAll('.faq__answer').forEach(ans => {
            if (ans !== answer) {
                ans.style.maxHeight = '0';
                ans.classList.remove('active');
            }
        });

        document.querySelectorAll('.faq__question').forEach(question => {
            if (question !== item) {
                question.classList.remove('active'); // Remove active class from other questions
                question.closest('.faq__item').classList.remove('active'); // Remove active class from parent item
            }
        });

        // Toggle the current answer and parent item
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = '0'; // Collapse
            answer.classList.remove('active');
            item.classList.remove('active'); // Remove active class from question
            faqItem.classList.remove('active'); // Remove active class from item
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px'; // Expand
            answer.classList.add('active');
            item.classList.add('active'); // Add active class to question
            faqItem.classList.add('active'); // Add active class to item
        }
    });
});





// pricing swither
document.querySelectorAll('.pricing__switcher-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.pricing__switcher-btn').forEach(btn => 
            btn.classList.remove('pricing__switcher-btn--active')
        );
        // Add active class to the clicked button
        button.classList.add('pricing__switcher-btn--active');

        // Hide all pricing cards
        document.querySelectorAll('.pricing__cards').forEach(card => 
            card.classList.add('pricing__cards--hidden')
        );
        // Show the target pricing cards
        const targetClass = button.getAttribute('data-target');
        document.querySelector(`.${targetClass}`).classList.remove('pricing__cards--hidden');
    });
});






// Select all filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add the 'active' class to the clicked button
    button.classList.add('active');
  });
});

  
// coundown section
function startCounter() {
  const counters = document.querySelectorAll('#stats-section .animated-text');

  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 100; // Adjust speed (100 steps)

      const updateCounter = () => {
          if (count < target) {
              count += increment;
              counter.textContent = Math.ceil(count);
              requestAnimationFrame(updateCounter); // Smooth animation
          } else {
              counter.textContent = target; // Ensure it ends at the target
          }
      };
      updateCounter();
  });
}


document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#stats-section');
    if (section) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startCounter();
                    observer.disconnect(); // Run only once
                }
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );
        observer.observe(section);
    } 
});

  



// signin page tab
const tabButtons = document.querySelectorAll('.tab-button');
const forms = document.querySelectorAll('.auth-form');

// Loop through each tab button
tabButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Remove 'active' class from all tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked button
        button.classList.add('active');

        // Get the target form ID from the data-target attribute
        const targetForm = button.getAttribute('data-target');

        // Show the target form and hide others
        forms.forEach(form => {
            form.classList.toggle('active', form.id === targetForm);
        });
    });
});



// ===================menu=========================================

// Toggle mobile menu
const menuToggle = document.querySelector('.header__menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.mobile-nav__close-btn');
const body = document.body;

// Function to close all dropdowns
const closeAllDropdowns = () => {
  document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(item => {
    item.classList.remove('active'); // Close all dropdowns
  });
};

menuToggle.addEventListener('click', () => {
  mobileNav.classList.add('active'); // Slide in the menu
  body.classList.add('menu-open'); // Add overlay and disable scrolling
});

closeBtn.addEventListener('click', () => {
  mobileNav.classList.remove('active'); // Slide out the menu
  body.classList.remove('menu-open'); // Remove overlay and enable scrolling
  closeAllDropdowns(); // Close all dropdowns
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    !mobileNav.contains(e.target) && // Click is outside the menu
    !menuToggle.contains(e.target) && // Click is not on the toggle button
    mobileNav.classList.contains('active')  
  ) {
    mobileNav.classList.remove('active');  
    body.classList.remove('menu-open');  
    closeAllDropdowns();  
  }
});

// Dropdown functionality
document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(item => {
  const link = item.querySelector('.mobile-nav__link');
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    e.stopPropagation();  
    item.classList.toggle('active');
    const parentItem = item.closest('.mobile-nav__item--has-dropdown');
    if (parentItem) {
      parentItem.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    } else {
      document.querySelectorAll('.mobile-nav__item--has-dropdown').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    }
  });
});

// Prevent clicks on non-dropdown links from closing the dropdown
document.querySelectorAll('.mobile-nav__item:not(.mobile-nav__item--has-dropdown) .mobile-nav__link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop event from bubbling to parent dropdown items
  });
});



// ==========================ANIMATION=======================
AOS.init({
duration: 1000,  
offset: 200,  
easing: 'ease-in-out',  
once: false  
});


// =============================form validatation ====================
document.addEventListener('DOMContentLoaded', () => {
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email-signup');
const passwordInput = document.getElementById('password-signup');
const strengthStatus = document.getElementById('strength-status');
const strengthItems = document.querySelectorAll('.strength-item');

if (!form) {
    return;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateName(nameInput.value)) {
        alert('Please enter a valid name.');
        return;
    }

    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePasswordStrength(passwordInput.value)) {
        alert('Password does not meet the requirements.');
        return;
    }

    alert('Form submitted successfully!');
    form.submit();
});

// Name Validation
function validateName(name) {
    return /^[a-zA-Z ]{2,30}$/.test(name);
}

// Email Validation
function validateEmail(email) {
    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Password Strength Validation
function validatePasswordStrength(password) {
    const lengthRequirement = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password === '') {
        strengthStatus.textContent = 'Weak';
        strengthStatus.classList.remove('active');
        resetStrengthItems();
        return false;
    }

    const isStrong = lengthRequirement && hasNumber && hasSpecialChar && hasUpperCase && hasLowerCase;

    strengthStatus.textContent = isStrong ? 'Strong' : 'Weak';
    strengthStatus.classList.toggle('active', isStrong);

    updateStrengthItems(lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase);

    return isStrong;
}

// Update Strength Item Classes
function updateStrengthItems(lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase) {
    const strengthArray = [lengthRequirement, hasNumber, hasSpecialChar, hasUpperCase, hasLowerCase];

    strengthItems.forEach((item, index) => {
        if (strengthArray[index]) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Reset Strength Items
function resetStrengthItems() {
    strengthItems.forEach(item => {
        item.classList.remove('active');
    });
}

// Live Password Strength Check
passwordInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});

nameInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});

emailInput.addEventListener('input', () => {
    validatePasswordStrength(passwordInput.value);
});
});



// swiper slider  for logo =====================================
const swiperLeft = new Swiper(".integrations-logos__slider-left", {
    slidesPerView: 'auto',  
    spaceBetween: 40,  
    loop: true, 
    speed: 3000,  
    allowTouchMove: false,  
    autoplay: {
        delay: 1,  
        disableOnInteraction: false, 
    }
});
const swiperRight = new Swiper(".integrations-logos__slider-right", {
    slidesPerView: 'auto', // Automatically adjust the number of slides visible
    spaceBetween: 40, // Space between slides
    loop: true, // Enable infinite loop
    speed: 3000, // Speed of the transition (in milliseconds)
    allowTouchMove: false, // Disable user interaction
    autoplay: {
        delay: 1, // Delay between slides (in milliseconds)
        disableOnInteraction: false, // Continue autoplay even if user interacts
        reverseDirection: true, // Scroll from right to left
    }
});

