// set backgrond image dynamacaly=========================================
document.addEventListener('DOMContentLoaded', function() {
    const bgDivs = document.querySelectorAll('[data-bg-img]');
    bgDivs.forEach(div => {
        const bgImg = div.getAttribute('data-bg-img');
        
        if (bgImg) {
            div.style.background = `url(${bgImg})`;
            div.style.backgroundSize = 'cover';  
            div.style.backgroundPosition = 'center';  
            div.style.zIndex = '999';  
        }
    });
});



// FAQ section ===============================================================================
const faqQuestions = document.querySelectorAll('.ub-faq__question');
const firstAnswer = document.querySelector('.ub-faq__answer.active');
if (firstAnswer) {
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';  
}

// Add click event listeners for toggle
faqQuestions.forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.closest('.ub-faq__item');  
        const answer = faqItem.querySelector('.ub-faq__answer');

        // Close other answers and remove active class from other questions
        document.querySelectorAll('.ub-faq__answer').forEach(ans => {
            if (ans !== answer) {
                ans.style.maxHeight = '0';
                ans.classList.remove('active');
            }
        });

        document.querySelectorAll('.ub-faq__question').forEach(question => {
            if (question !== item) {
                question.classList.remove('active'); 
                question.closest('.ub-faq__item').classList.remove('active'); 
            }
        });

        // Toggle the current answer and parent item
        if (answer.classList.contains('active')) {
            answer.style.maxHeight = '0'; 
            answer.classList.remove('active');
            item.classList.remove('active'); 
            faqItem.classList.remove('active');  
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';  
            answer.classList.add('active');
            item.classList.add('active');  
            faqItem.classList.add('active'); 
        }
    });
});


// pricing swither pricing section=============================================================
document.querySelectorAll('.ub-pricing__switcher-btn').forEach(button => {
    button.addEventListener('click', () => {
        
        document.querySelectorAll('.ub-pricing__switcher-btn').forEach(btn => 
            btn.classList.remove('ub-pricing__switcher-btn--active')
        );

        button.classList.add('ub-pricing__switcher-btn--active');
        document.querySelectorAll('.ub-pricing__cards').forEach(cards => 
            cards.classList.add('ub-pricing__cards--hidden')
        );

        const targetClass = button.getAttribute('data-target');
        document.querySelector(`.ub-pricing__cards[data-target="${targetClass}"]`).classList.remove('ub-pricing__cards--hidden');
    });
});


// pricing swither pricing signle page=========================================================
document.querySelectorAll('.ub-pricing-details__switcher-btn').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('.ub-pricing-details__switcher-btn').forEach(btn => 
            btn.classList.remove('ub-pricing-details__switcher-btn--active')
        );
        
        button.classList.add('ub-pricing-details__switcher-btn--active');
        document.querySelectorAll('.ub-pricing-details__card').forEach(card => 
            card.classList.add('ub-pricing-details__card--hidden')
        );
        const targetClass = button.getAttribute('data-target');
        document.querySelector(`.ub-pricing-details__card[data-target="${targetClass}"]`).classList.remove('ub-pricing-details__card--hidden');
    });
});


// Select all filter buttons===================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

  
// Countdown Section ==========================================================================
function startCounter() {
  const counters = document.querySelectorAll('#ub-stats .ub-stats__animated-text');

  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target'); // Get the target number
      let count = 0;
      const duration = 2000; // Animation duration in milliseconds
      const startTime = performance.now(); // Get the start time for smooth animation

      const updateCounter = (currentTime) => {
          const elapsedTime = currentTime - startTime; // Calculate elapsed time
          const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1
          count = Math.floor(progress * target); // Calculate the current count

          counter.textContent = count.toLocaleString(); // Update the counter text with formatted number

          if (progress < 1) {
              requestAnimationFrame(updateCounter); // Continue the animation
          } else {
              counter.textContent = target.toLocaleString(); // Ensure it ends at the target
          }
      };

      requestAnimationFrame(updateCounter); // Start the animation
  });
}

// Trigger the counter animation when the section comes into view
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.getElementById('ub-stats');

  if (statsSection) {
      const observer = new IntersectionObserver(
          (entries) => {
              if (entries[0].isIntersecting) {
                  startCounter(); // Start the counter when the section is visible
                  observer.disconnect();  
              }
          },
          { threshold: 0.5 } 
      );

      observer.observe(statsSection);  
  } else {
      console.error('Element with id "ub-stats" not found in the DOM.');
  }
});

  



// signin page tab==============================================================================
const tabButtons = document.querySelectorAll('.ub-auth__tab');
const forms = document.querySelectorAll('.ub-auth__form');

// Loop through each tab button
tabButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        tabButtons.forEach(btn => btn.classList.remove('ub-auth__tab--active'));
        button.classList.add('ub-auth__tab--active');
        const targetForm = button.getAttribute('data-target');
        forms.forEach(form => {
            form.classList.toggle('ub-auth__form--active', form.id === targetForm);
        });
    });
});



// ===================menu=========================================
// Toggle mobile menu
const menuToggle = document.querySelector('.ub-header__menu-toggle');
const mobileNav = document.querySelector('.ub-mobile-nav');
const closeBtn = document.querySelector('.ub-mobile-nav__close-btn');
const body = document.body;

// Function to close all dropdowns
const closeAllDropdowns = () => {
  document.querySelectorAll('.ub-mobile-nav__item--has-dropdown').forEach(item => { 
    item.classList.remove('active');  
  });
};

menuToggle.addEventListener('click', () => {
  mobileNav.classList.add('active');  
  body.classList.add('menu-open');  
});

closeBtn.addEventListener('click', () => {
  mobileNav.classList.remove('active');  
  body.classList.remove('menu-open');  
  closeAllDropdowns();  
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    !mobileNav.contains(e.target) &&  
    !menuToggle.contains(e.target) && 
    mobileNav.classList.contains('active')  
  ) {
    mobileNav.classList.remove('active');  
    body.classList.remove('menu-open');  
    closeAllDropdowns();  
  }
});

// Dropdown functionality
document.querySelectorAll('.ub-mobile-nav__item--has-dropdown').forEach(item => {
  const link = item.querySelector('.ub-mobile-nav__link');
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    e.stopPropagation();  
    item.classList.toggle('active');
    const parentItem = item.closest('.ub-mobile-nav__item--has-dropdown');
    if (parentItem) {
      parentItem.querySelectorAll('.ub-mobile-nav__item--has-dropdown').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    } else {
      document.querySelectorAll('.ub-mobile-nav__item--has-dropdown').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    }
  });
});

// Prevent clicks on non-dropdown links from closing the dropdown
document.querySelectorAll('.ub-mobile-nav__item:not(.ub-mobile-nav__item--has-dropdown) .ub-mobile-nav__link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop event from bubbling to parent dropdown items
  });
});


// ==========================ANIMATION===============================================
AOS.init({
duration: 1000,  
offset: 200,  
easing: 'ease-in-out',  
once: false  
});


// swiper slider  for logo ==========================================================
const brandSLider = new Swiper(".ub-brands__slider-area", {
    slidesPerView: 'auto',  
    spaceBetween: 40,  
    loop: true, 
    speed: 3000,  
    allowTouchMove: false,  
    autoplay: {
        delay: 1,  
        disableOnInteraction: false, 
    },
    breakpoints: {
        1024: { 
            spaceBetween: 40,  
        },
        768: {  
            spaceBetween: 30,  
        },
        480: { 
            spaceBetween: 20,  
        }
    }

});

const swiperLeft = new Swiper(".ub-integrations__slider-left", {
    slidesPerView: 'auto',  
    spaceBetween: 40,  
    loop: true, 
    speed: 3000,  
    allowTouchMove: false,  
    autoplay: {
        delay: 1,  
        disableOnInteraction: false, 
    },
    breakpoints: {
        1024: { 
            spaceBetween: 40,  
        },
        768: {  
            spaceBetween: 30,  
        },
        480: { 
            spaceBetween: 20,  
        }
    }

});

const swiperRight = new Swiper(".ub-integrations__slider-right", {
    slidesPerView: 'auto',  
    spaceBetween: 40,  
    loop: true,  
    speed: 3000, 
    allowTouchMove: false, 
    autoplay: {
        delay: 1,  
        disableOnInteraction: false,  
        reverseDirection: true,  
    },
    breakpoints: {
        1024: {  
            spaceBetween: 40,  
        },
        768: {   
            spaceBetween: 30,  
        },
        480: {  
            spaceBetween: 20,  
        }
    }

});


// active menu color on desktop========================================
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu__item");
    const currentUrl = window.location.pathname.split("/").pop();
    menuItems.forEach((item) => {
      const link = item.querySelector("a");
      if (!link) return;
      const linkHref = link.getAttribute("href");
      if (linkHref === "#" || linkHref === "" || linkHref === null) return;
      if (linkHref === currentUrl) {
        item.classList.add("menu__item--active");
      }
      item.addEventListener("click", function () {
        menuItems.forEach((el) => el.classList.remove("menu__item--active"));
        this.classList.add("menu__item--active");
      });
    });
});
  
  
// latest post filter ==================================================================
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".ub-latest-posts__filter-btn");
    const posts = document.querySelectorAll(".ub-latest-posts__card");
    const noPostsMessage = document.querySelector(".ub-latest-posts__no-posts");

    filterButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("ub-latest-posts__filter-btn--active"));
            this.classList.add("ub-latest-posts__filter-btn--active");

            // Get the selected category
            const selectedCategory = this.getAttribute("data-category");
            let hasVisiblePost = false;

            posts.forEach(post => {
                const postCategory = post.getAttribute("data-category");

                if (selectedCategory === "all" || postCategory === selectedCategory) {
                    post.style.display = "block";
                    hasVisiblePost = true;
                } else {
                    post.style.display = "none";
                }
            });

            // Show or hide the "No Posts Available" message
            noPostsMessage.style.display = hasVisiblePost ? "none" : "block";
        });
    });
});



