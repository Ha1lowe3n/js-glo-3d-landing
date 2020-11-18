window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // functions 
  const animateScroll = (id) => {
    document.querySelector(id).scrollIntoView({
      block: 'start',
      behavior: 'smooth'  
    });
  };

  const validate = (target) => {
    const numbers = () => {
      return target.replace(/[^\d.]/gi, '');
    };

    const phone = () => {
      return target.replace(/[^0-9+]$/g, '');
    };

    const text = () => {
      return target.replace(/[^а-яё ]$/i, '');
    };

    return {
      numbers: numbers,
      phone: phone,
      text: text
    };
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
  countTimer('15 nov 2020');


  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu');
          
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', (e) => {
      const target = e.target; 

      if (target.closest('.menu')) {
        e.preventDefault();
        handlerMenu();
      } else if (target.closest('menu')) {
        e.preventDefault();

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


  // add dots
  const addDots = () => {
    const portfolioItem = document.querySelectorAll('.portfolio-item'),
          portfolioDots = document.querySelector('.portfolio-dots');

    for (let i = 0; i < portfolioItem.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      portfolioDots.append(dot);
    }
     
    portfolioDots.children[0].classList.add('dot-active');
  };
  addDots();


  // Slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          dots = document.querySelectorAll('.dot'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      currentSlide++;

      if (currentSlide >= slide.length) { 
        currentSlide = 0; 
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    startSlide();

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      }

      if (target.matches('#arrow-left')) {
        currentSlide--;
      }  
      
      if (target.matches('.dot')) {
        dots.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) { 
        currentSlide = 0; 
      } else if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') ||
      e.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') ||
      e.target.matches('.dot')) {
        startSlide();
      }
    });

  };
  slider();


  // switch imgs
  const switchImg = () => {
    const getImg = (img) => {
      img.addEventListener('mouseenter', (e) => {
        [e.target.src, e.target.dataset.img] = 
        [e.target.dataset.img, e.target.src];
      });

      img.addEventListener('mouseleave', (e) => {
        [e.target.dataset.img, e.target.src] =
        [e.target.src, e.target.dataset.img]; 
      });
    };

    const containerImg = document.querySelectorAll('.container .command__photo');

    containerImg.forEach(item => getImg(item));
  };
  switchImg();


  // calc
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;

      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
   
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      } 

      

      const animate = (totalValue, total, speed = 10) => {
        let push = total / 100;

        if (totalValue.textContent !== total) {
          if (totalValue.textContent > total) {
            push = -(totalValue.textContent / 100);
          }
  
          let timer = setInterval(() => {
            totalValue.textContent = Math.ceil(+totalValue.textContent + push);
            if ((total - totalValue.textContent) * push < 1) {
              clearInterval(timer);
              totalValue.textContent = Math.round(total);
            }
          }, speed);
        }
        
        return totalValue.textContent;
      };

      totalValue.textContent = animate(totalValue, total);
    };

    calcBlock.addEventListener('input', (e) => {
      const target = e.target;

      if (target.matches('select') || target.matches('input')) {
        target.value = validate(target.value).numbers();
        countSum();
      }
    });
  };
  calc(100);


  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll('form');
    
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
      font-size: 2rem;
      color: white
    `;

    const postFunc = (form) => {

      const validateForms = (form) => {
        [...form.elements].forEach(item => {
          item.addEventListener('input', () => {
            if (item.tagName.toLowerCase() !== 'button' && item.type !== 'button') {
              if (item.type === 'tel') {
                item.value = validate(item.value).phone();
              }
  
              if (item.type === 'text' || item.name === 'user_message') {
                item.value = validate(item.value).text();
              }
            }
          });
        });
      };
      validateForms(form);
  
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.append(statusMessage);
        statusMessage.innerHTML = `
          <div class="overlay-loader">
            <div class="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        `;
  
        const formData = new FormData(form);
        let body = {};
        
        formData.forEach((val, key) => body[key] = val);

        postData(body)
        .then(() => statusMessage.textContent = successMessage)
        .catch(error => {
          console.error(error);
          statusMessage.textContent = errorMessage;
        });

      });
  
      const postData = (body) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest(form);
          request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
              return;
            }
    
            if (request.status === 200) {
              resolve();
            } else {
              reject(request.status);
            }
    
            form.reset();
            setTimeout(() => {
              statusMessage.remove();
            }, 3000);
          });
  
          request.open('POST', './server.php');
          request.setRequestHeader('Content-Type', 'application/json');
    
          request.send(JSON.stringify(body));
        });
        
      };
    };

    forms.forEach(item => {
      postFunc(item);
    });

  };
  sendForm();
  
});
