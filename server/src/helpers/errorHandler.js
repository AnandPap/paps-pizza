const getErrorMessage = (err) => {
  let message = "";
  for (let errName in err.errors) {
    if (err.errors[errName].message) {
      message = err.errors[errName].message;
    }
  }
  return message;
};

module.exports = getErrorMessage;
