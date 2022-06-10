import { refs } from "../refs";

const buttonref = document.querySelector('.return-result');
buttonref.addEventListener('click', returnPreviousSession);

function returnPreviousSession() {
    const localResult = localStorage.getItem('result');
    const localEhealthCopyResult = localStorage.getItem('ehealthCopyResult');
    const localFormData = JSON.parse(localStorage.getItem('formData'));

    if (localResult && localEhealthCopyResult) {
         refs.result.textContent = localResult;
         refs.copyRes.textContent = localEhealthCopyResult;
    }

    if (localFormData) {
        console.log(localFormData);


        for (const key in localFormData) {
         
            if (Object.hasOwnProperty.call(localFormData, key)) {
                const element = localFormData[key];
                console.log(key +": "+ element);
            }
        }
    }
}