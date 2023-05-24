const form = document.querySelector('form');

const fields = {
    first_name: document.getElementById('first_name'),
    last_name: document.getElementById('last_name'),
    phone_number: document.getElementById('phone_number'),
    confirm_password: document.getElementById('confirm_password'),
    mail: document.getElementById('mail'),
    password: document.getElementById('password'),
}

const errorRepository = {
    valueMissing: e => {
        return `You need to enter an ${e.labels[0].textContent.toLowerCase().replace('*', '')}.`
    },
    typeMismatch: {
        mail: 'Entered value needs to be an email address.',
    },
    patternMismatch: {
        phone_number: 'Incorrect phone number',
        password: 'Minimum eight characters, at least one letter and one number',
    },
    tooShort: e => {
        return `Email should be at least ${e.minLength} characters you entered ${e.value.length}.`
    },

    confirm_password: 'Passwords don\'t match',
}

const errorSpans = {
    mail: document.querySelector('#mail + span.error'),
    first_name: document.querySelector('#first_name + span.error'),
    phone_number: document.querySelector('#phone_number + span.error'),
    password: document.querySelector('#password + span.error'),
    confirm_password: document.querySelector('#confirm_password + span.error'),
}

fields.mail.addEventListener('input', e => {
    validation(fields.mail);
});

fields.first_name.addEventListener('input', e => {
    validation(fields.first_name);
});

fields.phone_number.addEventListener('input', e => {
    validation(fields.phone_number);
});

fields.password.addEventListener('keyup', e => {
    validation(fields.password);
    getConfirmPassword(fields.confirm_password);
});

fields.confirm_password.addEventListener('keyup', getConfirmPassword);

function getConfirmPassword() {
    if (confirmPassword()) {
        setValid(fields.confirm_password);
        errorSpans.confirm_password.textContent = '';
        console.log(fields.confirm_password.textContent);
        if (fields.confirm_password.value === '') {
            setInvalid(fields.confirm_password);
            errorSpans.confirm_password.textContent = errorRepository.valueMissing(fields.confirm_password).replace('enter an', '');
        }
    } else {
        setInvalid(fields.confirm_password);
        errorSpans.confirm_password.textContent = errorRepository.confirm_password;

    }
}

fields.last_name.addEventListener('input', e => {
    if (fields.last_name.value === '') {
        resetValidBorder(fields.last_name);
    } else {
        setValidBorder(fields.last_name);
    }
});

function validation(element) {
    if (element.validity.valid) {
        errorSpans[element.id].textContent = '';
        setValid(element);
    } else {
        setInvalid(element);
        showError(element);
    }
}

/*form.addEventListener("submit", (event) => {
    if (!fields.mail.validity.valid) {
        showError();
        event.preventDefault();
    }
});*/

function showError(element) {
    if (element.validity.valueMissing) {
        errorSpans[element.id].textContent = errorRepository.valueMissing(element);
    } else if (element.validity.typeMismatch) {
        errorSpans[element.id].textContent = errorRepository.typeMismatch[element.id];
    } else if (element.validity.tooShort) {
        errorSpans[element.id].textContent = errorRepository.tooShort(element);
    } else if (element.validity.patternMismatch) {
        errorSpans[element.id].textContent = errorRepository.patternMismatch[element.id];
    }
}

function confirmPassword() {
    return fields.password.value === fields.confirm_password.value;
}

function setErrorBorder(element) {
    element.classList.add('invalid');
}

function resetErrorBorder(element) {
    element.classList.remove('invalid');
}

function setValidBorder(element) {
    if (element.value != '') {
        element.classList.add('valid');
    }
}

function resetValidBorder(element) {
    element.classList.remove('valid');
}

function setInvalid(element) {
    resetValidBorder(element);
    setErrorBorder(element);
}

function setValid(element) {
    resetErrorBorder(element);
    setValidBorder(element);
}