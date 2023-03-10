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
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');
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
  // console.log(intersec_entry);
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
// implementing lazy loading images
//1-select all img-element ,that only contain data-src attribute
// const imgTargets = document.querySelectorAll('img[data-src]');

//callback-function
const imgLoader_Func = function (intersec_entries, observer) {
  const intersec_entry = intersec_entries[0];
  const entryTarget = intersec_entry.target;
  if (!intersec_entry.isIntersecting) return;
  console.log(intersec_entry);
  //3- Replace img.src with img.dataset.src
  entryTarget.src = entryTarget.dataset.src;
  // 4- for loading Img this step is very important
  // It says when img finishes loading, then remove class .lazy-img
  // if you want test it , use Network tab in Devtool of google
  //and change speed of internet
  entryTarget.addEventListener('load', function () {
    entryTarget.classList.remove('lazy-img');
  });
  observer.unobserve(entryTarget);
};
// LoadsOptions Obj
const LoadsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
//2-observer
const imgObserver = new IntersectionObserver(imgLoader_Func, LoadsOptions);
imgTargets.forEach(function (element_img) {
  imgObserver.observe(element_img);
});

/**************************Task_8*********************************/
////////from Task_9 - build component part 2
// this functiion for dot activation from task-9
const dotActiv = function (slide = 0) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    dot.classList.remove('dots__dot--active');
  });
  const activeSlide = document.querySelector(
    `.dots__dot[data-slide="${slide}"]`
  );
  activeSlide.classList.add('dots__dot--active');
};
const sliderPart_1 = function () {
  ///////////
  // Building a Slider Component: Part1
  // starting with Slides
  const maxSlide = slides.length - 1;
  let currentSlide = 0;
  slides.forEach(function (slide, index) {
    // 0%, 100%, 200%, 300%
    let calc = index * 100;
    slide.style.transform = `translateX(${calc}%)`;
  });

  // Moving to Next to slide with btnRight
  const moveToNext = function () {
    currentSlide++;
    slides.forEach(function (slide, index) {
      let calc = index * 100;
      if (currentSlide > maxSlide) {
        currentSlide = 0;
      }
      slide.style.transform = `translateX(${calc - currentSlide * 100}%)`;
    });
    dotActiv(currentSlide);
  };

  // Moving to previous slide with btnLeft
  const moveToPrev = function () {
    currentSlide--;
    slides.forEach(function (slide, index) {
      let calc = index * 100;
      if (currentSlide < 0) {
        currentSlide = maxSlide;
      }
      slide.style.transform = `translateX(${calc - currentSlide * 100}%)`;
    });
    dotActiv(currentSlide);
  };

  btnRight.addEventListener('click', moveToNext);
  btnLeft.addEventListener('click', moveToPrev);
  //// attaching addEvent-handler to arrowkey in keyboard
  document.addEventListener('keydown', function (event) {
    console.log(event.key); // press any arrowkey in keyboard
    if (event.key === 'ArrowRight') moveToNext();
    if (event.key === 'ArrowLeft') moveToPrev();
  });
};
sliderPart_1();
/**************************Task_9*********************************/
// Building slider component(part2)
/** 
 * // reference to cssStyle of dots
 * .dots {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.dots__dot {
  border: none;
  background-color: #b9b9b9;
  opacity: 0.7;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 1.75rem;
  cursor: pointer;
  transition: all 0.5s;

  // Only necessary when overlying images 
  // /box-shadow: 0 0.6rem 1.5rem rgba(0, 0, 0, 0.7);/ 
}

.dots__dot:last-child {
  margin: 0;
}

.dots__dot--active {
//  background-color: #fff;
  background-color: #888;
  opacity: 1;
}
 */
const sliderPart_2 = function () {
  //Starting with adding dots for each slide
  // helpful functons
  const moveTo = function (slide) {
    slides.forEach(function (s, index) {
      let calc = index * 100;
      if (slide < 0) {
        slide = maxSlide;
      }
      s.style.transform = `translateX(${calc - slide * 100}%)`;
    });
  };
  const addDots_Func = function () {
    slides.forEach(function (slide, index) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}">
      </button>`
      );
    });
  };
  const initDots = function () {
    addDots_Func();
    // set it to 0 for first slide at the begining
    dotActiv(0);
  };
  initDots();
  // using delegtion way
  dotsContainer.addEventListener('click', function (event) {
    event.preventDefault();
    const eventTarget = event.target;
    console.log(eventTarget);
    if (eventTarget.classList.contains('dots__dot')) {
      const slide = eventTarget.dataset.slide;
      moveTo(slide);
      dotActiv(slide);
    }
  });
};
sliderPart_2();

/**************************Task_10*********************************/
// Efficent script loading and executing with defer <script></script>
// finishing my project
