function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateEmailFormat(email) {
  const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regEx.test(email);
}

async function validateUniqueUsername(username) {
  const user = await this.constructor.findOne({ username });
  if (user) {
    if (this.id === user.id) return true;
    else return false;
  } else return true;
}

async function validateUniqueEmail(email) {
  const user = await this.constructor.findOne({ email });
  if (user) {
    if (this.id === user.id) return true;
    else return false;
  } else return true;
}

function getSaveErrorMessage(err, type) {
  let errorMessage = `Error while saving the ${type}.`;
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        errorMessage = capitalizeFirstLetter(err.errors[errName].message);
        break;
      }
    }
  }
  return errorMessage;
}

module.exports = {
  capitalizeFirstLetter,
  validateEmailFormat,
  validateUniqueUsername,
  validateUniqueEmail,
  getSaveErrorMessage,
};
