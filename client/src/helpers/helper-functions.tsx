function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const toCamelCase = (text: string) => {
  const words = text.split("");
  let word = "";
  for (let i = 0; i < words.length; i++) {
    if (i === 0) word += words[0].charAt(0).toLowerCase() + words[0].slice(1);
    else word += words[1].charAt(0).toUpperCase() + words[1].slice(1);
  }
  return word;
};

export { capitalizeFirstLetter, toCamelCase };
