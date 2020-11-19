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

export default switchImg;