/**
 * Template Name: SoftLand
 * Template URL: https://bootstrapmade.com/softland-bootstrap-app-landing-page-template/
 * Updated: Mar 17 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the class 'subscribeButton'
    var subscribeButtons = document.querySelectorAll(".subscribeButton");
    // Loop through each button and attach a click event listener
    subscribeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Show the modal when the button is clicked
        var modal = new bootstrap.Modal(
          document.getElementById("subscribeModal")
        );
        modal.show();
      });
    });

    // Get the subscription form element
    var subscriptionForm = document.getElementById("subscriptionForm");
    // Add submit event listener to the form
    subscriptionForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Get all input value
      var emailInput = document.getElementById("email").value;
      var name = document.getElementById("name").value;
      // var companyName = document.getElementById("companyName").value;
      // var position = document.getElementById("position").value;
      // var phoneNo = document.getElementById("phoneNo").value;
      // var g7Company = document.getElementById("g7Company").value;
      // var existingG7Project =
      //   document.getElementById("existingG7Project").value;
      // var range = document.getElementById("range").value;
      // var upcomingG7Project =
      //   document.getElementById("upcomingG7Project").value;
      // var description = document.getElementById("description").value;

      var data = {
        email: emailInput,
        name: name,
        // companyName: companyName,
        // position: position,
        // phoneNo: phoneNo,
        // g7Company: g7Company,
        // existingG7Project: existingG7Project,
        // range: range,
        // upcomingG7Project: upcomingG7Project,
        // description: description,
      };

      var data2 = {
        email: emailInput,
        name: name,
      };

      // console.log("🚀 ~ data:", data);

      fetch("http://tenderspot-be.bina.cloud/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Form submitted successfully");
            // Close the modal
            var modal = new bootstrap.Modal(
              document.getElementById("subscribeModal")
            );
            modal.hide();
          } else {
            console.error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Here you can further validate or process the form data before submission
      // For this example, let's just close the modal
      var modal = new bootstrap.Modal(
        document.getElementById("subscribeModal")
      );
      modal.hide();
    });
  });
})();
