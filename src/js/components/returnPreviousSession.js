import { refs } from "../refs";

const buttonref = document.querySelector('.return-result');
buttonref.addEventListener('click', returnPreviousSession);

function returnPreviousSession() {
    const localResult = localStorage.getItem('result');
    const localehealthCopyResult = localStorage.getItem('ehealthCopyResult');

    if (localResult && localehealthCopyResult) {
         refs.result.textContent = localResult;
         refs.copyRes.textContent = localehealthCopyResult;
    }
}