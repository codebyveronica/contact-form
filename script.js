const inputs = document.querySelectorAll('input');

const fname = document.querySelector('#first-name');
const lname = document.querySelector('#last-name');
const email = document.querySelector('#email');
const types = document.getElementsByName('type');
const message = document.querySelector('#message');
const consent = document.querySelector('#consent');
const submitButton = document.querySelector('#submit');
let isValidEmail = false;

// Functions
const checkInputValue = (input, message) => {
    const parentEl = input.parentElement;
    const span = parentEl.querySelector('span');

    if(input.value == '') {
        input.classList.add('error');
        span.innerHTML = message;
    } else {
        input.classList.remove('error');
        span.innerHTML = '';
    }
}

const checkIfEmailIsValid = (email) => {
    const feedbackElement = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(email.value)) {
        feedbackElement.textContent = ""; // Email is valid
        email.classList.remove('error');
        isValidEmail = true;
    } else {
        feedbackElement.textContent = "Please enter a valid email address.";
        email.classList.add('error');
        isValidEmail = false;
    }
}

const checkInputRadio = () => {
    const tgeneralParentEl = types[0].parentElement;
    const tsupportParentEl = types[1].parentElement;
    const elementFeedback = document.querySelector('#radioFeedback');

    if(types[0].checked == true) {
        tgeneralParentEl.classList.add('checked');
        tsupportParentEl.classList.remove('checked');
        elementFeedback.innerHTML = '';
    }else if(types[1].checked == true) {
        tgeneralParentEl.classList.remove('checked');
        tsupportParentEl.classList.add('checked');
        elementFeedback.innerHTML = '';
    } else {
        tgeneralParentEl.classList.remove('checked');
        tsupportParentEl.classList.remove('checked');
    }
}

const checkIfIsConsent = (consent) => {
    const consentFeedback = document.querySelector('#consentFeedback');

    if(consent.checked == false) {
        consentFeedback.innerHTML = 'To submit this form, please consent to being contacted'
    } else {
        consentFeedback.innerHTML = '';
    }
}

// Event Listeners
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputValue(fname, 'This field is required');
    checkInputValue(lname, 'This field is required');
    checkIfEmailIsValid(email);
    checkInputValue(message, 'This field is required');
    checkIfIsConsent(consent);

    if(types[0].checked == false && types[1].checked == false) {
        const elementFeedback = document.querySelector('#radioFeedback');
        elementFeedback.innerHTML = 'Please select a query type'
    } else {
        const elementFeedback = document.querySelector('#radioFeedback');
        elementFeedback.innerHTML = '';
    }

    if(fname != '' && lname != '' && isValidEmail == true && message != '' && consent.checked == true && (types[0].checked == true || types[1].checked == true)) {
        const sentMessage = document.querySelector('#sentMessage');
        sentMessage.classList.remove('hide');
        sentMessage.classList.add('show-form')
        sentMessage.classList.add('show')
        setTimeout(() => {
            sentMessage.classList.remove('show');
            sentMessage.classList.add('hide');
        }, 5000);
        setTimeout(() => {
            sentMessage.classList.remove('show-form');
        }, 6000);
    }
})

types.forEach(type => {
    type.addEventListener('click', (e) => {
        checkInputRadio();
    })
})