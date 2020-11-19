const validate = (target) => {
  const numbers = () => {
    return target.replace(/[^\d.]/gi, '');
  };

  const phone = () => {
    return target.replace(/[^0-9+]$/g, '');
  };

  const text = () => {
    return target.replace(/[^а-яё ]$/i, '');
  };

  return {
    numbers: numbers,
    phone: phone,
    text: text
  };
};

export default validate;