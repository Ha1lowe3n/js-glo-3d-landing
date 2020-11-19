import animateScroll from './animateScroll';

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

export default toggleMenu;