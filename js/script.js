const form = document.getElementById('formLogin');
let inputs = document.querySelectorAll('#formLogin input');
let disableButton = document.getElementById('disableButton');
let containerError = document.getElementById('containerError');

const expressions = {
    pass: /^.{6,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const values = {
    email: false,
    pass: false
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "email":
            validateValue(expressions.email, e.target, "email")
            break;
        case "pass":
            validateValue(expressions.pass, e.target, "pass")
            break;
    }
}

const validateValue = (expression, input, value) => {
    if (expression.test(input.value)) {
        document.querySelector(`.input__${value}`).classList.remove('error');
        document.getElementById(`container__${value}`).classList.remove('error')
        document.getElementById(`icon__success__${value}`).classList.add('active')
        document.getElementById(`message__error__${value}`).classList.remove('active')
        values[value] = true;
    } else {
        document.querySelector(`.input__${value}`).classList.add('error');
        document.getElementById(`container__${value}`).classList.add('error');
        document.getElementById(`icon__success__${value}`).classList.remove('active');
        document.getElementById(`message__error__${value}`).classList.add('active');
        values[value] = false;
    }
}

inputs.forEach((collbak) => {
    collbak.addEventListener('keyup', validateForm);
    collbak.addEventListener('blur', validateForm);
})

form.addEventListener('submit', e => {
    e.preventDefault();
    if (values.email && values.pass) {
        disableButton.classList.add('active')
        setTimeout(() => {
            disableButton.classList.remove('active')
            form.reset();
        }, 5000);
    } else {
        containerError.classList.add('active');
        disableButton.classList.add('active')
        setTimeout(() => {
            disableButton.classList.remove('active')
            containerError.classList.remove('active');
        }, 5000);
    }
})