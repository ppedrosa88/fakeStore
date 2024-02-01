import { postData } from "./utils/index.js";
import { loginUrl, registerUrl } from "./utils/urls.js";

const loginForm = document.getElementById('login-form');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');

loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
    event.preventDefault();
    if (emailLogin.value && passwordLogin.value) {

        const body = {
            username: emailLogin.value,
            password: passwordLogin.value
        }

        try {
            const login = await postData(loginUrl, body)
            const token = login.token;
            loginForm.reset();

            if (token) {
                window.localStorage.setItem('access_token', token);
                window.location.href = '../home/index.html';
            }
        } catch (error) {

            if (error) {
                const errorList = document.getElementById('error-list');
                const errorItem = document.createElement('li');
                errorItem.textContent = error.message;
                errorList.appendChild(errorItem)
                errorList.classList.add('show');
                errorItem.classList.add('error-item');
                loginForm.reset()
                setTimeout(() => {
                    errorList.removeChild(errorItem);
                    errorList.classList.remove('show');
                }, 5000)
            }

        }
    }
}

const registerForm = document.getElementById('register-form');
const nameRegister = document.getElementById('name-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister = document.getElementById('password-register');

registerForm.addEventListener('submit', handleRegister);

async function handleRegister(event) {
    event.preventDefault();

    if (nameRegister.value && emailRegister.value && passwordRegister.value) {
        console.log(nameRegister.value)
        console.log(emailRegister.value)
        console.log(passwordRegister.value)

        const body = {
            name: nameRegister.value,
            email: emailRegister.value,
            password: passwordRegister.value,
            avatar: 'https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
        }

        const register = await postData(registerUrl, body)
            .catch((error) => {
                throw new Error(error);
            });
        if (register.statusCode === 401 || register.statusCode === 400) {
            console.log(register.message)
        } else if (register.creationAt) {
            // Siempre y cuando se pudiera guardar debería de traerme el token y guardarlo en el localStorage
            window.location.href = '../home/index.html';
        }
    }
}