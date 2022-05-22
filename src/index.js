import './sass/main.scss';

const refs = {
    form: document.querySelector('#form'),
}

let rvResult;



refs.form.addEventListener('submit', onSubmit);
// const formData = {};






///Main function
function onSubmit(e) {
    e.preventDefault();

    const formDataRaw = new FormData(e.currentTarget);

    const formData = {};

    formDataRaw.forEach((value, key) => {
        // if (value === '') {
        //     alert('Всі поля повинні бути заповнені');
        //     throw 'Break';
        // }

        formData[key] = value;
    })
    console.log(formData);


    //Destructuring
    const { rv, la } = formData;

    // console.log(rv);

    // console.log(typeof(rv));
    // console.log(typeof(Number(rv)));

    // return formData;

    // let functionResult;
    // let alertNotification;


    rvResult = dimentionCheck(Number(rv), 0.9, 2.6);

    console.log(rvResult);
  

}

///Additional functions

function dimentionCheck(heartPart, min, max) {

    switch (true) {
        case isNaN(heartPart):
            alertNotification = 'Введіть числове значення';
            break;
        case heartPart <= 0:
            // alertNotification = 'Введіть додатнє число';
            alert('Введіть додатнє число');
            break;
        case heartPart > max:
            return 'D';
            break;
        case heartPart < min:
            return 'S';
            break;
    
        default:
            return 'N';
            // functionResult = 'N';
            alertNotification = '';
            break;
    }
}