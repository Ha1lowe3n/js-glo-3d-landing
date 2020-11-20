import postData from './postData';
import validate from './validate';

const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const forms = document.querySelectorAll('form'),
        popup = document.querySelector('.popup');
  
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = `
    font-size: 2rem;
    color: white
  `;

  const postFunc = (form) => {

    const validateForms = (form) => {

      [...form.elements].forEach(item => {
        if (item.type === 'email') {
          item.setAttribute("required", true);
        }

        item.addEventListener('input', () => {
          if (item.tagName.toLowerCase() !== 'button' && item.type !== 'button') {
            if (item.type === 'tel') {
              item.value = validate(item.value).phoneInput();
            }

            if (item.type === 'text' || item.name === 'user_message') {
              item.value = validate(item.value).textInput();
            }

            if (item.type === 'email') {
              item.value = validate(item.value).emailInput();
            }
          }
        });

        const changeInput = () => {
          const errorText = document.createElement('div');
          errorText.classList.add('validate-error');

          const clearError = () => {
            item.insertAdjacentElement('afterend', errorText);
              item.value = '';
              setTimeout(() => {
                errorText.remove();
              }, 3000);
          };
          
          if (item.type === 'email') {
            if (!validate(item.value).emailBlur() && item.value !== '') {
              errorText.textContent = 'Неверно введен email!';
              clearError();
            } 
          } 
          
          if (item.type === 'tel') {
            if (!validate(item.value).phoneBlur() && item.value !== '') {
              errorText.textContent = 'Неверно введен номер телефона!';
              clearError();
            } 
          } 
        };

        item.addEventListener('blur', changeInput);
      });
    };
    validateForms(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.appendChild(statusMessage);
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
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Status network isn't 200");
        }
        statusMessage.textContent = successMessage;
      })
      .catch(error => {
        console.error(error);
        statusMessage.textContent = errorMessage;
      })
      .finally(() => {
        form.reset();
        setTimeout(() => {
          popup.style.display = 'none';
          statusMessage.remove();
        }, 3000);
      });

    });
    
  };

  forms.forEach(item => {
    postFunc(item);
  });

};

export default sendForm;