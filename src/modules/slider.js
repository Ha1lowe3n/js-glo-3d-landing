const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
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

export default slider;