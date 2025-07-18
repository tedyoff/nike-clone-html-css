document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");

  if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    });

    mobileMenuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  // --- Search Bar Toggle ---
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.querySelector(".search-container");
  const searchInputField = document.querySelector(".search-input");

  if (searchIcon && searchContainer && searchInputField) {
    searchIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent document click from immediately closing
      searchContainer.classList.toggle("active");
      if (searchContainer.classList.contains("active")) {
        searchInputField.focus();
      } else {
        searchInputField.value = ""; // Clear search field when collapsing
      }
    });

    // Close search when clicking outside the search container
    document.addEventListener("click", function (event) {
      if (
        !searchContainer.contains(event.target) &&
        event.target !== searchIcon
      ) {
        searchContainer.classList.remove("active");
        searchInputField.value = "";
      }
    });

    // Prevent closing when clicking inside the input field
    searchInputField.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // --- Interactive Banner/Carousel Logic ---
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-nav.prev");
  const nextButton = document.querySelector(".carousel-nav.next");
  const carouselDotsContainer = document.querySelector(".carousel-dots");
  const heroTextElements = document.querySelectorAll(".hero-text-animate");

  let currentSlideIndex = 0;
  const totalCarouselSlides = carouselSlides.length;
  let autoSlideInterval;
  if (
    carouselContainer &&
    carouselSlides.length > 0 &&
    prevButton &&
    nextButton &&
    carouselDotsContainer
  ) {
    // Create dots dynamically
    for (let i = 0; i < totalCarouselSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.index = i;
      carouselDotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".carousel-dots .dot"); // Re-query to get newly created dots
    function animateHeroText() {
      // Reset animations by removing and re-adding classes, or directly manipulating opacity/transform
      heroTextElements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.animation = "none"; // Remove previous animation
      });

      // Trigger reflow to restart animation
      void heroTextElements[0].offsetWidth; // force reflow

      heroTextElements.forEach((el, index) => {
        el.style.animation = `slideInUp 1s ease-out forwards ${0.2 * index}s`;
      });
    }  
    // Initial setup
    goToSlide(0); // Show first slide and animate its text
    startAutoSlide();
    // Optional: Pause auto-scroll on hover
    carouselContainer.addEventListener("mouseenter", () =>
      clearInterval(autoSlideInterval)function updateCarousel() {
      const offset = -currentSlideIndex * 100;
      carouselContainer.style.transform = `translateX(${offset}%)`;

      dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
      animateHeroText(); // Animate text every time slide changes
    }
    function goToSlide(index) {
      currentSlideIndex = index;
      if (currentSlideIndex < 0) {
        currentSlideIndex = totalCarouselSlides - 1;
      } else if (currentSlideIndex >= totalCarouselSlides) {
        currentSlideIndex = 0;
      }
      updateCarousel();
    }
    function nextCarouselSlide() {
      goToSlide(currentSlideIndex + 1);
    }
    function prevCarouselSlide() {
      goToSlide(currentSlideIndex - 1);
    }
    // Event listeners for arrows
    prevButton.addEventListener("click", () => {
      prevCarouselSlide();
      resetAutoSlide();
    });
    nextButton.addEventListener("click", () => {
      nextCarouselSlide();
      resetAutoSlide();
    });
    // Event listeners for dots
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index);
        resetAutoSlide();
      });
    });
    // Auto-scrolling
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextCarouselSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    );
    carouselContainer.addEventListener("mouseleave", startAutoSlide);
  }
});
