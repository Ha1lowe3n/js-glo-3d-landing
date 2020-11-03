window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Timer

  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

      return { hours, minutes, seconds, timeRemaining };     
    };

    const timeInterval = setInterval(updateClock, 1000);

    const getZero = (num) => num >= 0 && num < 10 ?
     `0${num}` : num;

    function updateClock() {
      const timer = getTimeRemaining();

      const trueClock = (timeValue, timeSelector) => timeValue <= 0 ? 
        timeSelector.textContent = '00' : 
        timeSelector.textContent = getZero(timeValue);

      trueClock(timer.hours, timerHours);
      trueClock(timer.minutes, timerMinutes);
      trueClock(timer.seconds, timerSeconds);
      
      if (timer.timeRemaining <= 0) {
        clearInterval(timeInterval);
      } 
    }
  };
  countTimer('06 nov 2020');


  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((item) => item.addEventListener('click', handlerMenu));
  };
  toggleMenu();


  //POPUP Window
  const togglePopUp = () => {
    let requestId;

    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupCloseBtn = popup.querySelector('.popup-close');

    const animation = () => {
      requestId = requestAnimationFrame(animation);
      let value = 0;
      value = parseFloat(popup.style.opacity);

      if (value > 1) { cancelAnimationFrame(requestId); }

      value += 0.015;
      popup.style.opacity = value;
    };

    popupBtn.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerHeight > 768) {
          popup.style.opacity = 0;
          popup.style.display = 'block';
          requestId = requestAnimationFrame(animation);
        } else {
          popup.style.display = 'block';
        }
      });
    });

    popupCloseBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopUp();


});
