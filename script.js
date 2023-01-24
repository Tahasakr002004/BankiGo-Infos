'use strict';

///////////////////////////////////////
// Modal window

/***************************Task_1***************************/
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
