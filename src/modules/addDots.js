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

export default addDots;