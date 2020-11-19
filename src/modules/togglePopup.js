const togglePopup = () => {
  let requestId;

  const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');
        
  const animation = () => {
    requestId = requestAnimationFrame(animation);
    let value = 0;
    value = parseFloat(popup.style.opacity);

    if (value > 1) { 
      cancelAnimationFrame(requestId); 
    }

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

export default togglePopup;