window.addEventListener('DOMContentLoaded', () => {
  'use strict';

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

  countTimer('03 nov 2020');

});
