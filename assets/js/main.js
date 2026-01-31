// --- Cart Drawer Functionality ---
document.addEventListener('DOMContentLoaded', function() {
  var cartDrawer = document.getElementById('cartDrawer');
  var cartDrawerBtn = document.querySelector('.cart-btn');
  var cartDrawerClose = document.getElementById('cartDrawerClose');
  var cartDrawerOverlay = document.getElementById('cartOverlay');

  function openCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('open');
    if (cartDrawerOverlay) {
      cartDrawerOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('open');
    if (cartDrawerOverlay) {
      cartDrawerOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (cartDrawerBtn) {
    cartDrawerBtn.addEventListener('click', openCartDrawer);
  }
  if (cartDrawerClose) {
    cartDrawerClose.addEventListener('click', closeCartDrawer);
  }
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', closeCartDrawer);
  }
});
// ========== PRICE RANGE SLIDER (SHOP1) ==========
document.addEventListener('DOMContentLoaded', () => {
  const minInput = document.getElementById('priceMin');
  const maxInput = document.getElementById('priceMax');
  const minValue = document.getElementById('priceMinValue');
  const maxValue = document.getElementById('priceMaxValue');
  if (minInput && maxInput && minValue && maxValue) {
    const minGap = 10;
    minInput.addEventListener('input', () => {
      let min = parseInt(minInput.value);
      let max = parseInt(maxInput.value);
      if (min > max - minGap) {
        min = max - minGap;
        minInput.value = min;
      }
      minValue.textContent = min;
    });
    maxInput.addEventListener('input', () => {
      let min = parseInt(minInput.value);
      let max = parseInt(maxInput.value);
      if (max < min + minGap) {
        max = min + minGap;
        maxInput.value = max;
      }
      maxValue.textContent = max;
    });
    // Initialize display
    minValue.textContent = minInput.value;
    maxValue.textContent = maxInput.value;
  }
});
// ========== SHOP1 PAGE SCRIPTS MOVED FROM shop1.html ========== 
document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE MENU
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      navLinks.classList.toggle('active');
    };
    menuToggle.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // 2. SHOPPING CART
  let cartCount = 0;
  const cartCountEl = document.getElementById('cartCount');
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const toast = document.getElementById('toast');

  const showToast = () => {
    if (!toast) return;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  };

  const updateCart = () => {
    if (!cartCountEl) return;
    cartCountEl.textContent = cartCount;
    cartCountEl.style.transform = 'scale(1.4)';
    setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);
  };

  const handleAddToCart = (e) => {
    cartCount++;
    updateCart();
    showToast();
  };

  addToCartBtns.forEach(btn => btn.addEventListener('click', handleAddToCart));

  // 3. FILTER INTERACTION (Visual Only)
  const filterItems = document.querySelectorAll('.filter-list li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const siblings = item.parentElement.children;
      Array.from(siblings).forEach(sib => sib.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
// ========== END SHOP1 PAGE SCRIPTS ========== 
/* =========================
  LuxeStore - Main JS
  Author: Your Name
  Version: 1.0
========================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 1) Mobile Menu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
      navLinks.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => navLinks.classList.remove("active"))
      );
    }

    // 2) Hero Slider
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.getElementById("nextSlide");
    const prevBtn = document.getElementById("prevSlide");

    let currentSlide = 0;
    let slideInterval = null;

    function showSlide(index) {
      slides.forEach((s) => s.classList.remove("active"));
      dots.forEach((d) => d.classList.remove("active"));

      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides[currentSlide].classList.add("active");
      if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    function startSlider() {
      if (slides.length <= 1) return;
      slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    function stopSlider() {
      if (slideInterval) clearInterval(slideInterval);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopSlider();
        showSlide(currentSlide + 1);
        startSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        stopSlider();
        showSlide(currentSlide - 1);
        startSlider();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const i = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        stopSlider();
        showSlide(i);
        startSlider();
      });
    });

    startSlider();

    // 3) Cart Toast
    let cartCount = 0;
    const cartCountEl = document.getElementById("cartCount");
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    function showToast(msg) {
      if (!toast || !toastMessage) return;
      toastMessage.textContent = msg;
      toast.classList.add("active");
      setTimeout(() => toast.classList.remove("active"), 3000);
    }

    function updateCart() {
      if (!cartCountEl) return;
      cartCountEl.textContent = cartCount;
      cartCountEl.style.transform = "scale(1.2)";
      setTimeout(() => (cartCountEl.style.transform = "scale(1)"), 200);
    }

    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const name = e.currentTarget.getAttribute("data-name") || "Item";
        cartCount++;
        updateCart();
        showToast(`Added "${name}" to cart.`);
      });
    });
  });
})();

/* ======================================================
  Product Details Page (Gallery + Qty + Options)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* Gallery */
  const mainImage = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll(".thumb");

  if (mainImage && thumbs.length) {
    thumbs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-src");
        if (src) mainImage.src = src;

        thumbs.forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  /* Quantity */
  const qtyValue = document.getElementById("qtyValue");
  const qtyBtns = document.querySelectorAll(".qty-btn");
  let currentQty = qtyValue ? parseInt(qtyValue.textContent || "1", 10) : 1;

  const renderQty = () => {
    if (qtyValue) qtyValue.textContent = String(currentQty);
  };

  qtyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const change = parseInt(btn.getAttribute("data-qty") || "0", 10);
      currentQty = currentQty + change;
      if (currentQty < 1) currentQty = 1;
      renderQty();
    });
  });

  /* Color swatches */
  const swatches = document.querySelectorAll(".swatch-btn");
  const selectedColor = document.getElementById("selectedColor");

  if (swatches.length) {
    swatches.forEach((btn) => {
      btn.addEventListener("click", () => {
        swatches.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const color = btn.getAttribute("data-color");
        if (selectedColor && color) selectedColor.textContent = color;
      });
    });
  }

  /* Size buttons */
  const sizeBtns = document.querySelectorAll(".size-btn");
  if (sizeBtns.length) {
    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sizeBtns.forEach((b) => {
          b.classList.remove("active");
          b.removeAttribute("aria-pressed");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      });
    });
  }
});
/* =========================================
   LuxeStore Journal - ThemeForest Standard JS
   - Mobile menu: ESC close, click outside, body lock
   - Tag active selection (bug fixed)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navOverlay = document.getElementById("navOverlay");
  const navLinks = document.getElementById("navLinks");
  const tagButtons = document.querySelectorAll(".tag");

  const openMenu = () => {
    if (navOverlay) {
      navOverlay.classList.add("active");
    } else if (navLinks) {
      navLinks.classList.add("active");
    }
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (navOverlay) {
      navOverlay.classList.remove("active");
    } else if (navLinks) {
      navLinks.classList.remove("active");
    }
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const isActive = (navOverlay && navOverlay.classList.contains("active")) || (navLinks && navLinks.classList.contains("active"));
    if (isActive) closeMenu();
    else openMenu();
  };

  // Mobile menu toggle
  if (menuBtn && (navOverlay || navLinks)) {
    menuBtn.addEventListener("click", toggleMenu);

    // Close when click a link
    const navElement = navOverlay || navLinks;
    if (navElement) {
      navElement.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
      });
    }

    // Close when click outside
    document.addEventListener("click", (e) => {
      const clickedInsideNav = navElement && navElement.contains(e.target);
      const clickedMenuBtn = menuBtn.contains(e.target);

      const isActive = (navOverlay && navOverlay.classList.contains("active")) || (navLinks && navLinks.classList.contains("active"));
      if (!clickedInsideNav && !clickedMenuBtn && isActive) {
        closeMenu();
      }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      const isActive = (navOverlay && navOverlay.classList.contains("active")) || (navLinks && navLinks.classList.contains("active"));
      if (e.key === "Escape" && isActive) {
        closeMenu();
      }
    });
  }

  // Tag active UI (bug fix: HTMLCollection => Array.from)
  tagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Optional: later you can filter posts using btn.dataset.filter
      // const filter = btn.dataset.filter;
    });
  });

  // Prevent search form reload (template behavior)
  const searchForm = document.querySelector(".search-box");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  /* Mobile menu (shared) */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    const toggleMenu = () => {
      navLinks.classList.toggle("active");
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
    };

    menuToggle.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Copy link interaction (blog details) */
  const copyBtn = document.querySelector('.share-btn[data-copy-link="true"]');

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const original = copyBtn.textContent.trim();
      const url = window.location.href;

      try {
        await navigator.clipboard.writeText(url);
        copyBtn.textContent = "Link Copied!";
      } catch (e) {
        // Fallback if clipboard permission blocked
        copyBtn.textContent = "Copy failed";
      }

      setTimeout(() => {
        copyBtn.textContent = original;
      }, 1800);
    });
  }

  /* Newsletter prevent default (demo template standard) */
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
});


// Payment method active state (ThemeForest standard: no inline onclick)
document.addEventListener("DOMContentLoaded", () => {
  const payButtons = document.querySelectorAll(".pay-btn");

  payButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      payButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const radio = btn.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
});
