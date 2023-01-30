'use strict';
///////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
///////////////////////////////////////

/***************************Task_1***************************/
// Modal window
console.log(btnsOpenModal);
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (event) {
  event.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
btnsOpenModal.forEach(function (currentButton, index) {
  currentButton.addEventListener('click', openModal);
});
// btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/**************************Task_1*********************************/
// implementing Smooth Scrolling

btnScrollTo.addEventListener('click', function (event) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
/**************************Task_2*********************************/
// Using eventDelegation for more efficient smooth navigation
//1.Add event Listener to common parent element
//2.Delermine what element originated the event
document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    const eventTarget = event.target;
    //console.log( eventTarget );
    // Matching strategy
    if (eventTarget.classList.contains('nav__link')) {
      const element_Id = eventTarget.getAttribute('href');
      document.querySelector(element_Id).scrollIntoView({ behavior: 'smooth' });
      console.log('scroll-Link');
    }
  });

/**************************Task_3*********************************/
// .operations__tab--active {
//   transform: translateY(-66%);
// }
// .operations__content {
//   display: none;

//   /* JUST PRESENTATIONAL */
//   font-size: 1.7rem;
//   padding: 2.5rem 7rem 6.5rem 7rem;
// }

// .operations__content--active {
//   display: grid;
//   grid-template-columns: 7rem 1fr;
//   column-gap: 3rem;
//   row-gap: 0.5rem;
// }
// Building a tabbed component

// using Event delegation
tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const tabTarget = event.target.closest('.operations__tab');
  // if (!tabTarget) return; // Gaurd clause
  if (tabTarget) {
    // remove activation
    tabs.forEach(function (tab) {
      tab.classList.remove('operations__tab--active');
    });
    tabsContent.forEach(function (content) {
      content.classList.remove('operations__content--active');
    });
    // active tab and content
    tabTarget.classList.add('operations__tab--active');
    /////
    document
      .querySelector(`.operations__content--${tabTarget.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

/**************************Task_4*********************************/

// Passing Arguments to Event Handlers
// Menu fade animation
const handleHover = function (event, opacity) {
  const linkTarget = event.target;
  if (linkTarget.classList.contains('nav__link')) {
    const siblings = linkTarget.closest('.nav').querySelectorAll('.nav__link');
    const imgLogo = linkTarget.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(function (element) {
      if (element !== linkTarget) {
        element.style.opacity = opacity;
        imgLogo.style.opacity = opacity;
      }
    });
  }
};
// using anynomus function
nav.addEventListener('mouseover', function (event) {
  handleHover(event, 0.5);
});
nav.addEventListener('mouseout', function (event) {
  handleHover(event, 1);
});

/**************************Task_5*********************************/
// implementing a sticky Navigation: the scroll event
// .nav {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 9rem;
//   width: 100%;
//   padding: 0 6rem;
//   z-index: 100;
//  }
/* nav and stickly class at the same time */
// .nav.sticky {
//   position: fixed;
//   background-color: rgba(255, 255, 255, 0.95);
// }
///less performant stick navi
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//// implementing sticky Nav using intersection Observer ApI
const obsCallback_func = function (intersect_entries, observer) {
  intersect_entries.forEach(function (intersect_entry) {
    // console.log(intersect_entry);
    if (!intersect_entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};
const obsOptions = {
  root: null,
  threshold: 0.1,
};
const observer = new IntersectionObserver(obsCallback_func, obsOptions);
observer.observe(header);

/**************************Task_6*********************************/
//Revealing sections/elements on scroll
// .section--hidden {
//   opacity: 0;
//   transform: translateY(8rem);
//  }
const callbackReveal_Func = function (intersec_entries, observer) {
  const intersec_entry = intersec_entries[0];
  console.log(intersec_entry);
  if (!intersec_entry.isIntersecting) return;
  intersec_entry.target.classList.remove('section--hidden');
  //then unobserve(entry.target)
  observer.unobserve(intersec_entry.target); // for more performance
};
const revOptions = {
  root: null,
  threshold: 0.15,
};
const revealObserver = new IntersectionObserver(
  callbackReveal_Func,
  revOptions
);
allSections.forEach(function (sec_element) {
  revealObserver.observe(sec_element);
  sec_element.classList.add('section--hidden');
});

/**************************Task_7*********************************/
