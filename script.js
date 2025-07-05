// Select DOM elements
const resultEl = document.querySelector('.result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.querySelector('.btn_large');
const clipboardBtn = document.querySelector('.btn');

// Functions to generate characters
const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Object of available generators
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate password
function generatePassword(length, upper, lower, number, symbol) {
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;
  const typesArr = [
    { upper },
    { lower },
    { number },
    { symbol },
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}

// Event listener for generate button
generateBtn.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const password = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
  resultEl.textContent = password;
});

// Event listener for clipboard copy
clipboardBtn.addEventListener('click', () => {
  const password = resultEl.textContent;

  if (!password) return;

  navigator.clipboard.writeText(password)
    .then(() => {
      alert('Password copied to clipboard!');
    })
    .catch(() => {
      alert('Failed to copy!');
    });
});
