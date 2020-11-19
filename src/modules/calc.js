import validate from './validate';

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

export default calc;