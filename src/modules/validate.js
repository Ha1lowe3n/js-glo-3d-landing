const validate = (target) => {
  const numbers = () => {
    return target.replace(/[^\d.]/gi, '');
  };

  const phoneInput = () => {
    return target.replace(/[^\+\d]/ig, '');
  };

  const emailInput = () => {
    return target.replace(/[^a-z0-9+_\-.@]/i, '');
  };

  const textInput = () => {
    return target.replace(/[^а-яё _\-,.;!?\:]$/i, '');
  };

  const emailBlur = () => {
    let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let valid = re.test(target);   
    
    return valid;
  };

  const phoneBlur = () => {
    let re = /\+?[78]([-()]*\d){10}/g;
    let valid = re.test(target);  

    return valid;
  };

  return {
    numbers: numbers,
    phoneInput: phoneInput,
    emailInput: emailInput,
    textInput: textInput,
    emailBlur: emailBlur,
    phoneBlur: phoneBlur
  };
};

export default validate;