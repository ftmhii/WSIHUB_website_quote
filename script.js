document.addEventListener("DOMContentLoaded", () => {

  const currencySelect = document.getElementById("currency");
  const platformSelect = document.getElementById("platform");

  // Elements for WordPress options
  const wordpressOptions = document.getElementById("wordpress-options");
  const pagesInput = document.getElementById("pages");
  const logoDesignCheckbox = document.getElementById("logo-design");
  const contentPagesInput = document.getElementById("content-pages");
  const siteRecaptchaCheckbox = document.getElementById("site-recaptcha");
  const popupWindowCheckbox = document.getElementById("popup-window");
  const bilingualOptionSelect = document.getElementById("bilingual-option");
  const bilingualPagesInputGroup = document.getElementById("bilingual-pages-input");
  const bilingualPagesInput = document.getElementById("bilingual-pages");
  const adaWidgetCheckbox = document.getElementById("ada-widget");
  const contentWritingPagesInputGroup = document.getElementById("content-writing-pages-input");

  // Elements for Wix options
  const wixOptions = document.getElementById("wix-options");
  const wixPagesInput = document.getElementById("wix-pages");
  const wixLogoDesignCheckbox = document.getElementById("wix-logo-design");
  const wixContentPagesInput = document.getElementById("wix-content-pages");
  const wixSiteRecaptchaCheckbox = document.getElementById("wix-site-recaptcha");
  const wixPopupWindowCheckbox = document.getElementById("wix-popup-window");
  const wixBilingualOptionSelect = document.getElementById("wix-bilingual-option");
  const wixBilingualPagesInputGroup = document.getElementById("wix-bilingual-pages-input");
  const wixBilingualPagesInput = document.getElementById("wix-bilingual-pages");
  const wixAdaWidgetCheckbox = document.getElementById("wix-ada-widget");
  const wixContentWritingPagesInputGroup = document.getElementById("wix-content-writing-pages-input");
  const wixAdaWidgetGroup = document.getElementById("wix-ada-widget-group");

  const cadOnlyElements = document.querySelectorAll(".cad-only");
  const calculateBtn = document.getElementById("calculate-btn");
  const priceDisplay = document.getElementById("price-display");

  const updateVisibility = () => {
    const selectedPlatform = platformSelect.value;
    const selectedCurrency = currencySelect.value;

    wordpressOptions.style.display = selectedPlatform === "wordpress" ? "block" : "none";
    wixOptions.style.display = selectedPlatform === "wix" ? "block" : "none";

    cadOnlyElements.forEach(el => {
      el.style.display = selectedCurrency === "cad" && selectedPlatform === "wordpress" ? "block" : "none";
    });

    wixAdaWidgetGroup.style.display = selectedCurrency === "cad" && selectedPlatform === "wix" ? "block" : "none";

    contentWritingPagesInputGroup.style.display = selectedPlatform === "wordpress" ? "block" : "none";
    wixContentWritingPagesInputGroup.style.display = selectedPlatform === "wix" ? "block" : "none";

    bilingualPagesInputGroup.style.display = (selectedPlatform === "wordpress" && bilingualOptionSelect.value === "provided-content") ? "block" : "none";
    wixBilingualPagesInputGroup.style.display = (selectedPlatform === "wix" && wixBilingualOptionSelect.value === "provided-content") ? "block" : "none";

    // Reset inputs on platform or currency change
    pagesInput.value = 1;
    contentPagesInput.value = 0;
    logoDesignCheckbox.checked = false;
    siteRecaptchaCheckbox.checked = false;
    popupWindowCheckbox.checked = false;
    bilingualPagesInput.value = 0;
    adaWidgetCheckbox.checked = false;
    wixPagesInput.value = 1;
    wixContentPagesInput.value = 0;
    wixLogoDesignCheckbox.checked = false;
    wixSiteRecaptchaCheckbox.checked = false;
    wixPopupWindowCheckbox.checked = false;
    wixBilingualPagesInput.value = 0;
    wixAdaWidgetCheckbox.checked = false;
  };

  // New function for content writing pricing based on ranges
  const getContentWritingPrice = (pages, currency) => {
    if (pages <= 5) {
      return currency === "usd" ? 300 : 400;
    } else if (pages <= 10) {
      return currency === "usd" ? 600 : 800;
    } else if (pages <= 15) {
      return currency === "usd" ? 900 : 1200;
    } else if (pages <= 20) {
      return currency === "usd" ? 1200 : 1600;
    } else {
      return currency === "usd" ? 1200 : 1600;
    }
  };

  const calculatePrice = () => {
    let totalPrice = 0;
    const selectedPlatform = platformSelect.value;
    const selectedCurrency = currencySelect.value;

    if (selectedPlatform === "wordpress") {
      const numberOfPages = parseInt(pagesInput.value);
      if (isNaN(numberOfPages) || numberOfPages < 1) {
        alert("Please enter a valid number of pages (at least 1).");
        return;
      }
      if (selectedCurrency === "usd") {
        if (numberOfPages <= 10) {
          totalPrice = 350;
        } else {
          totalPrice = 350 + (numberOfPages - 10) * 20;
        }
        if (logoDesignCheckbox.checked) totalPrice += 300;

        const numberOfContentPages = parseInt(contentPagesInput.value);
        if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
          alert("Please enter a valid number of content pages (0 or more).");
          return;
        }
        totalPrice += getContentWritingPrice(numberOfContentPages, "usd");

        if (siteRecaptchaCheckbox.checked) totalPrice += 40;
        if (popupWindowCheckbox.checked) totalPrice += 25;

        if (bilingualOptionSelect.value === "google-translate") {
          totalPrice += 100;
        } else if (bilingualOptionSelect.value === "provided-content") {
          const numberOfBilingualPages = parseInt(bilingualPagesInput.value);
          if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
            alert("Please enter a valid number of bilingual pages (0 or more).");
            return;
          }
          totalPrice += numberOfBilingualPages * 14;
        }
      } else if (selectedCurrency === "cad") {
        if (numberOfPages <= 10) {
          totalPrice = 440;
        } else {
          totalPrice = 440 + (numberOfPages - 10) * 26;
        }
        if (logoDesignCheckbox.checked) totalPrice += 300;

        const numberOfContentPages = parseInt(contentPagesInput.value);
        if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
          alert("Please enter a valid number of content pages (0 or more).");
          return;
        }
        totalPrice += getContentWritingPrice(numberOfContentPages, "cad");

        if (popupWindowCheckbox.checked) totalPrice += 35;
        if (adaWidgetCheckbox.checked) totalPrice += 50;
        if (siteRecaptchaCheckbox.checked) totalPrice += 50;

        if (bilingualOptionSelect.value === "google-translate") {
          totalPrice += 100;
        } else if (bilingualOptionSelect.value === "provided-content") {
          const numberOfBilingualPages = parseInt(bilingualPagesInput.value);
          if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
            alert("Please enter a valid number of bilingual pages (0 or more).");
            return;
          }
          totalPrice += numberOfBilingualPages * 20;
        }
      }
    } else if (selectedPlatform === "wix") {
      const numberOfPages = parseInt(wixPagesInput.value);
      if (isNaN(numberOfPages) || numberOfPages < 1) {
        alert("Please enter a valid number of pages (at least 1).");
        return;
      }
      if (selectedCurrency === "usd") {
        if (numberOfPages <= 10) {
          totalPrice = 400;
        } else {
          totalPrice = 400 + (numberOfPages - 10) * 20;
        }
        if (wixLogoDesignCheckbox.checked) totalPrice += 300;

        const numberOfContentPages = parseInt(wixContentPagesInput.value);
        if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
          alert("Please enter a valid number of content pages (0 or more).");
          return;
        }
        totalPrice += getContentWritingPrice(numberOfContentPages, "usd");

        if (wixSiteRecaptchaCheckbox.checked) totalPrice += 40;
        if (wixPopupWindowCheckbox.checked) totalPrice += 25;

        if (wixBilingualOptionSelect.value === "google-translate") {
          totalPrice += 100;
        } else if (wixBilingualOptionSelect.value === "provided-content") {
          const numberOfBilingualPages = parseInt(wixBilingualPagesInput.value);
          if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
            alert("Please enter a valid number of bilingual pages (0 or more).");
            return;
          }
          totalPrice += numberOfBilingualPages * 14;
        }
      } else if (selectedCurrency === "cad") {
        if (numberOfPages <= 10) {
          totalPrice = 550;
        } else {
          totalPrice = 550 + (numberOfPages - 10) * 26;
        }
        if (wixLogoDesignCheckbox.checked) totalPrice += 300;

        const numberOfContentPages = parseInt(wixContentPagesInput.value);
        if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
          alert("Please enter a valid number of content pages (0 or more).");
          return;
        }
        totalPrice += getContentWritingPrice(numberOfContentPages, "cad");

        if (wixPopupWindowCheckbox.checked) totalPrice += 35;
        if (wixAdaWidgetCheckbox.checked) totalPrice += 50;
        if (wixSiteRecaptchaCheckbox.checked) totalPrice += 50;

        if (wixBilingualOptionSelect.value === "google-translate") {
          totalPrice += 100;
        } else if (wixBilingualOptionSelect.value === "provided-content") {
          const numberOfBilingualPages = parseInt(wixBilingualPagesInput.value);
          if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
            alert("Please enter a valid number of bilingual pages (0 or more).");
            return;
          }
          totalPrice += numberOfBilingualPages * 20;
        }
      }
    }

    priceDisplay.textContent = `$${totalPrice}`;
  };

  currencySelect.addEventListener("change", () => { 
    updateVisibility(); 
    calculatePrice(); 
  });

  platformSelect.addEventListener("change", () => { 
    updateVisibility(); 
    calculatePrice(); 
  });

  pagesInput.addEventListener("input", calculatePrice);
  logoDesignCheckbox.addEventListener("change", calculatePrice);
  contentPagesInput.addEventListener("input", calculatePrice);
  siteRecaptchaCheckbox.addEventListener("change", calculatePrice);
  popupWindowCheckbox.addEventListener("change", calculatePrice);
  bilingualOptionSelect.addEventListener("change", () => { 
    updateVisibility(); 
    calculatePrice(); 
  });
  bilingualPagesInput.addEventListener("input", calculatePrice);
  adaWidgetCheckbox.addEventListener("change", calculatePrice);

  wixPagesInput.addEventListener("input", calculatePrice);
  wixLogoDesignCheckbox.addEventListener("change", calculatePrice);
  wixContentPagesInput.addEventListener("input", calculatePrice);
  wixSiteRecaptchaCheckbox.addEventListener("change", calculatePrice);
  wixPopupWindowCheckbox.addEventListener("change", calculatePrice);
  wixBilingualOptionSelect.addEventListener("change", () => { 
    updateVisibility(); 
    calculatePrice(); 
  });
  wixBilingualPagesInput.addEventListener("input", calculatePrice);
  wixAdaWidgetCheckbox.addEventListener("change", calculatePrice);

  calculateBtn.addEventListener("click", calculatePrice);

  // Initial setup
  updateVisibility();
  calculatePrice();

});
