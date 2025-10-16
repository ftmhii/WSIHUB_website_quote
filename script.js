document.addEventListener("DOMContentLoaded", () => {
    const currencySelect = document.getElementById("currency");
    const platformSelect = document.getElementById("platform");

    const wordpressOptions = document.getElementById("wordpress-options");
    const shopifyOptions = document.getElementById("shopify-options");
    const wixOptions = document.getElementById("wix-options");

    // WordPress elements
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

    // Shopify elements
    const productsInput = document.getElementById("products");

    // Wix elements
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
        shopifyOptions.style.display = selectedPlatform === "shopify" ? "block" : "none";
        wixOptions.style.display = selectedPlatform === "wix" ? "block" : "none";

        // Show/hide CAD-only options for WordPress
        cadOnlyElements.forEach(el => {
            el.style.display = selectedCurrency === "cad" && selectedPlatform === "wordpress" ? "block" : "none";
        });

        // Show/hide CAD-only options for Wix
        wixAdaWidgetGroup.style.display = selectedCurrency === "cad" && selectedPlatform === "wix" ? "block" : "none";

        // Content writing pages input is always visible for WordPress/Wix now
        contentWritingPagesInputGroup.style.display = selectedPlatform === "wordpress" ? "block" : "none";
        wixContentWritingPagesInputGroup.style.display = selectedPlatform === "wix" ? "block" : "none";

        // Bilingual pages input visibility for WordPress
        bilingualPagesInputGroup.style.display = (selectedPlatform === "wordpress" && bilingualOptionSelect.value === "provided-content") ? "block" : "none";
        // Bilingual pages input visibility for Wix
        wixBilingualPagesInputGroup.style.display = (selectedPlatform === "wix" && wixBilingualOptionSelect.value === "provided-content") ? "block" : "none";

        // Reset values when switching platforms/currency
        pagesInput.value = 1;
        productsInput.value = 0;
        contentPagesInput.value = 0;
        logoDesignCheckbox.checked = false;
        siteRecaptchaCheckbox.checked = false;
        popupWindowCheckbox.checked = false;
        bilingualOptionSelect.value = "none";
        bilingualPagesInput.value = 0;
        adaWidgetCheckbox.checked = false;

        wixPagesInput.value = 1;
        wixContentPagesInput.value = 0;
        wixLogoDesignCheckbox.checked = false;
        wixSiteRecaptchaCheckbox.checked = false;
        wixPopupWindowCheckbox.checked = false;
        wixBilingualOptionSelect.value = "none";
        wixBilingualPagesInput.value = 0;
        wixAdaWidgetCheckbox.checked = false;
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
                // WordPress USD Pricing
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
                totalPrice += numberOfContentPages * 60; // $60 per content page
                if (siteRecaptchaCheckbox.checked) totalPrice += 40;
                if (popupWindowCheckbox.checked) totalPrice += 25;

                // Bilingual Website Options
                if (bilingualOptionSelect.value === "google-translate") {
                    totalPrice += 100;
                } else if (bilingualOptionSelect.value === "provided-content") {
                    const numberOfBilingualPages = parseInt(bilingualPagesInput.value);
                    if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
                        alert("Please enter a valid number of bilingual pages (0 or more).");
                        return;
                    }
                    totalPrice += numberOfBilingualPages * 14; // $14 per bilingual page (USD)
                }

            } else if (selectedCurrency === "cad") {
                // WordPress CAD Pricing
                if (numberOfPages <= 10) {
                    totalPrice = 440;
                } else {
                    totalPrice = 440 + (numberOfPages - 10) * 26;
                }
                if (logoDesignCheckbox.checked) totalPrice += 300; // Assuming same for CAD for now
                const numberOfContentPages = parseInt(contentPagesInput.value);
                if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
                    alert("Please enter a valid number of content pages (0 or more).");
                    return;
                }
                totalPrice += numberOfContentPages * 80; // $80 per content page
                if (popupWindowCheckbox.checked) totalPrice += 35;
                if (adaWidgetCheckbox.checked) totalPrice += 50;
                if (siteRecaptchaCheckbox.checked) totalPrice += 50;

                // Bilingual Website Options
                if (bilingualOptionSelect.value === "google-translate") {
                    totalPrice += 100;
                } else if (bilingualOptionSelect.value === "provided-content") {
                    const numberOfBilingualPages = parseInt(bilingualPagesInput.value);
                    if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
                        alert("Please enter a valid number of bilingual pages (0 or more).");
                        return;
                    }
                    totalPrice += numberOfBilingualPages * 20; // $20 per bilingual page (CAD)
                }
            }
        } else if (selectedPlatform === "shopify") {
            const numberOfProducts = parseInt(productsInput.value);
            if (isNaN(numberOfProducts) || numberOfProducts < 0) {
                alert("Please enter a valid number of products (0 or more).");
                return;
            }
            // Shopify Pricing (example, adjust as needed)
            if (selectedCurrency === "usd") {
                totalPrice = 500 + (numberOfProducts * 1);
            } else if (selectedCurrency === "cad") {
                totalPrice = 650 + (numberOfProducts * 1.3);
            }
        } else if (selectedPlatform === "wix") {
            const numberOfPages = parseInt(wixPagesInput.value);
            if (isNaN(numberOfPages) || numberOfPages < 1) {
                alert("Please enter a valid number of pages (at least 1).");
                return;
            }

            if (selectedCurrency === "usd") {
                // Wix USD Pricing (similar to WordPress, but different base)
                if (numberOfPages <= 10) {
                    totalPrice = 400; // Wix USD Base
                } else {
                    totalPrice = 400 + (numberOfPages - 10) * 20; // $20 per extra page
                }
                if (wixLogoDesignCheckbox.checked) totalPrice += 300;
                const numberOfContentPages = parseInt(wixContentPagesInput.value);
                if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
                    alert("Please enter a valid number of content pages (0 or more).");
                    return;
                }
                totalPrice += numberOfContentPages * 60; // $60 per content page
                if (wixSiteRecaptchaCheckbox.checked) totalPrice += 40;
                if (wixPopupWindowCheckbox.checked) totalPrice += 25;

                // Bilingual Website Options
                if (wixBilingualOptionSelect.value === "google-translate") {
                    totalPrice += 100;
                } else if (wixBilingualOptionSelect.value === "provided-content") {
                    const numberOfBilingualPages = parseInt(wixBilingualPagesInput.value);
                    if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
                        alert("Please enter a valid number of bilingual pages (0 or more).");
                        return;
                    }
                    totalPrice += numberOfBilingualPages * 14; // $14 per bilingual page (USD)
                }

            } else if (selectedCurrency === "cad") {
                // Wix CAD Pricing (similar to WordPress, but different base)
                if (numberOfPages <= 10) {
                    totalPrice = 550; // Wix CAD Base
                } else {
                    totalPrice = 550 + (numberOfPages - 10) * 26; // $26 per extra page
                }
                if (wixLogoDesignCheckbox.checked) totalPrice += 300; // Assuming same for CAD for now
                const numberOfContentPages = parseInt(wixContentPagesInput.value);
                if (isNaN(numberOfContentPages) || numberOfContentPages < 0) {
                    alert("Please enter a valid number of content pages (0 or more).");
                    return;
                }
                totalPrice += numberOfContentPages * 80; // $80 per content page
                if (wixPopupWindowCheckbox.checked) totalPrice += 35;
                if (wixAdaWidgetCheckbox.checked) totalPrice += 50;
                if (wixSiteRecaptchaCheckbox.checked) totalPrice += 50;

                // Bilingual Website Options
                if (wixBilingualOptionSelect.value === "google-translate") {
                    totalPrice += 100;
                } else if (wixBilingualOptionSelect.value === "provided-content") {
                    const numberOfBilingualPages = parseInt(wixBilingualPagesInput.value);
                    if (isNaN(numberOfBilingualPages) || numberOfBilingualPages < 0) {
                        alert("Please enter a valid number of bilingual pages (0 or more).");
                        return;
                    }
                    totalPrice += numberOfBilingualPages * 20; // $20 per bilingual page (CAD)
                }
            }
        }

        priceDisplay.textContent = `$${totalPrice}`;
    };

    currencySelect.addEventListener("change", () => { updateVisibility(); calculatePrice(); });
    platformSelect.addEventListener("change", () => { updateVisibility(); calculatePrice(); });
    pagesInput.addEventListener("input", calculatePrice);
    logoDesignCheckbox.addEventListener("change", calculatePrice);
    contentPagesInput.addEventListener("input", calculatePrice);
    siteRecaptchaCheckbox.addEventListener("change", calculatePrice);
    popupWindowCheckbox.addEventListener("change", calculatePrice);


    adaWidgetCheckbox.addEventListener("change", calculatePrice);

    bilingualOptionSelect.addEventListener("change", () => { updateVisibility(); calculatePrice(); });
    bilingualPagesInput.addEventListener("input", calculatePrice);

    productsInput.addEventListener("input", calculatePrice);

    wixPagesInput.addEventListener("input", calculatePrice);
    wixLogoDesignCheckbox.addEventListener("change", calculatePrice);
    wixContentPagesInput.addEventListener("input", calculatePrice);
    wixSiteRecaptchaCheckbox.addEventListener("change", calculatePrice);
    wixPopupWindowCheckbox.addEventListener("change", calculatePrice);


    wixAdaWidgetCheckbox.addEventListener("change", calculatePrice);

    wixBilingualOptionSelect.addEventListener("change", () => { updateVisibility(); calculatePrice(); });
    wixBilingualPagesInput.addEventListener("input", calculatePrice);

    calculateBtn.addEventListener("click", calculatePrice);

    // Initial setup
    updateVisibility();
    calculatePrice();
});

