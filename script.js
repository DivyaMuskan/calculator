// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    darkModeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

darkModeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    darkModeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
});

// Calculator functionality
const display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1500);
    }
}

// Currency conversion functionality
const exchangeRates = {
    USD: {
        EUR: 0.92,
        GBP: 0.79,
        JPY: 151.62,
        INR: 83.12,
        USD: 1
    },
    EUR: {
        USD: 1.09,
        GBP: 0.86,
        JPY: 164.80,
        INR: 90.35,
        EUR: 1
    },
    GBP: {
        USD: 1.27,
        EUR: 1.16,
        JPY: 191.92,
        INR: 105.22,
        GBP: 1
    },
    JPY: {
        USD: 0.0066,
        EUR: 0.0061,
        GBP: 0.0052,
        INR: 0.55,
        JPY: 1
    },
    INR: {
        USD: 0.012,
        EUR: 0.011,
        GBP: 0.0095,
        JPY: 1.82,
        INR: 1
    }
};

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const result = document.getElementById('result');

    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount');
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    result.value = convertedAmount;
}

// Add event listeners for keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Calculator keyboard support
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '.') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}); 