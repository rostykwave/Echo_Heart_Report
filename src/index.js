import './sass/main.scss';

const refs = {
    form: document.querySelector('#form'),
}

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    const formDataRaw = new FormData(e.currentTarget);
    console.log(formDataRaw);

    const formData = {};

    formDataRaw.forEach((value, key) => {
        if (value === '') {
            alert('Всі поля повинні бути заповнені');
            throw 'Break';
        }

        formData[key] = value;
    })
    console.log(formData);

}

