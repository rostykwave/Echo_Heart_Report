import { refs } from "../refs";

const buttonref = document.querySelector('.return-result');
buttonref.addEventListener('click', returnPreviousResult);

function returnPreviousResult() {
    const localResult = localStorage.getItem('result');
    if (localResult) {
        const result = localStorage.getItem('result');
         refs.result.textContent = result;
    }
}