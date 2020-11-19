const animateScroll = (id) => {
  document.querySelector(id).scrollIntoView({
    block: 'start',
    behavior: 'smooth'  
  });
};

export default animateScroll;