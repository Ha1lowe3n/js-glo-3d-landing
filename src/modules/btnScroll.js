import animateScroll from './animateScroll';

const btnScroll = () => {
  document.querySelector('a[href="#service-block"]')
  .addEventListener('click', (e) => {
    e.preventDefault();
    animateScroll('#service-block');
  });
};

export default btnScroll;