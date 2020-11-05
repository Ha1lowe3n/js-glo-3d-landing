window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // functions 
  const animateScroll = (id) => {
    document.querySelector(id).scrollIntoView({
      block: 'start',
      behavior: 'smooth'  
    });
  };

  // Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds'),
          timeInterval = setInterval(updateClock, 1000);

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

      return { hours, minutes, seconds, timeRemaining };     
    };

    updateClock();

    function updateClock() {
      const timer = getTimeRemaining();

      const getZero = (num) => num >= 0 && num < 10 ?
        `0${num}` : num;

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
    const menu = document.querySelector('menu');
          
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target; 

      if (target.closest('.menu')) {
        handlerMenu();
      } else if (target.closest('menu')) {

        if (target.classList.contains('close-btn')) {
          handlerMenu();

        } else if (!target.classList.contains('active-menu')) {
          animateScroll(e.target.getAttribute('href'));
          handlerMenu();
        } 

      } else if (menu.classList.contains('active-menu') && target.closest('body')) {
        handlerMenu();
      }
    });

  };
  toggleMenu();


  //POPUP Window
  const togglePopUp = () => {
    let requestId;

    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn');
          
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
        if (window.innerWidth > 768) {
          popup.style.opacity = 0;
          popup.style.display = 'block';
          requestId = requestAnimationFrame(animation);
        } else {
          popup.style.display = 'block';
        }
      });
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;
      
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }

    });
  };
  togglePopUp();

  //button to scroll
  document.querySelector('a[href="#service-block"]')
  .addEventListener('click', (e) => {
    e.preventDefault();
    animateScroll('#service-block');
  });


  //Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;
          target = target.closest('.service-header-tab');
    
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });

  };
  tabs();

});
