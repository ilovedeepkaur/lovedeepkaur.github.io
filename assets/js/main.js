/**
  * Template Name: Portfolio
  * Updated: Jan 27 2024 with Bootstrap v5.3.2
  * Author: Lovedeep Kaur
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });
  
  /**
 * Gallery lightbox for Graphics portfolio
 */
const graphicsGalleryLightbox = GLightbox({
    selector: '.graphics-portfolio-lightbox',
    width: '90%',
    height: '90vh'
});


  /**
   * Portfolio details slider
   */
 function loadPortfolioDetails(portfolioUrl) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var content = this.responseText;
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;

                var sectionId = portfolioUrl.split('#')[1];
                var specificSection = tempDiv.querySelector('#' + sectionId);

                var portfolioDetailsContainer = document.querySelector('.portfolio-details');

                if (specificSection && portfolioDetailsContainer) {
                    portfolioDetailsContainer.innerHTML = specificSection.innerHTML;

                    new Swiper('.portfolio-details-slider', {
                        speed: 400,
                        loop: true,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            type: 'bullets',
                            clickable: true
                        }
                    });
                } else {
                    console.error('Section or container not found in the response.');
                }
            } else {
                console.error('Error loading portfolio details. HTTP status:', this.status);
            }
        }
    };

    xhttp.open("GET", portfolioUrl, true);
    xhttp.send();
}


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()



    function openGallery() {
        const gallery = GLightbox({
            elements: [
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga1.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga2.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga3.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga4.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga5.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga6.png', 'type': 'image' },
                { 'href': 'ssets/img/portfolio/Graphics/Conestoga/Conestoga7.png', 'type': 'image' },
                { 'href': 'assets/img/portfolio/Graphics/Conestoga/Conestoga8.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga9.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga10.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga11.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga12.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga13.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga14.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga15.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga16.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga17.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga18.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga19.png', 'type': 'image' },
                { 'href': '/clickandbuilds/publichtml/Personal/assets/img/portfolio/Graphics/Conestoga/Conestoga20.png', 'type': 'image' },

                // Add more images as needed
            ]
        });
    }

