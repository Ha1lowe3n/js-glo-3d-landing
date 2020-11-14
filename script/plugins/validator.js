class Validate {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && 
      item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach( elem => this.checkIt({target: elem}));
      if ( this.error.size ) {
        e.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validateMethods = {
      notEmpty(elem) {
        if ( elem.value.trim() === '' ) {
          return false;
        }
        return true;
      }, 
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };
    
    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every( item => validateMethods[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей и методы их проверки');
    }

    return true;        
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (elem.nextElementSibling) {
      if (elem.nextElementSibling.classList.contains('validate-error')) {
        return;
      }
    }

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка';
    errorDiv.classList.add('validate-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    
    if (elem.nextElementSibling) {
      if (elem.nextElementSibling.classList.contains('validate-error')) {
        elem.nextElementSibling.remove();
      }
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green !important;
      }
      input.error {
        border: 2px solid red !important;
      }
      .validate-error {
        text-align: left;
        font-size: 14px;
        font-family: sans-serif;
        color: red;
      }
    `;
    document.head.append(style);
  }

  setPattern() {
    this.pattern['form1-name'] ? this.pattern['form1-name'] = this.pattern : this.pattern['form1-name'] = /([А-ЯЁа-яё]+){2,}/;
    this.pattern['form1-email'] ? this.pattern['form1-email'] = this.pattern : this.pattern['form1-email'] = /^\w+@\w+\.\w{2,}$/;
    this.pattern['form1-phone'] ? this.pattern['form1-phone'] = this.pattern : this.pattern['form1-phone'] = /^\+?[78]([-()]*\d){10}$/;
  }
}