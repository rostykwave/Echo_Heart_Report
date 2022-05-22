import './sass/main.scss';
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    form: document.querySelector('#form'),
    result: document.querySelector('#result'),
}


let rvResult = 'Spare';
let laResult = 'Spare';
let aortaResult = 'Spare';
let ivsResult = 'Spare';
let lvWallResult = 'Spare';
let lvResult = 'Spare';

let wallResult = 'Spare';
let chamberResult = 'Spare';

let result = 'Spare';


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
    const { rv, la, aorta, ivs, lvWall, lv } = formData;

    rvResult = dimentionCheck(Number(rv), 0.9, 2.6);
    laResult = dimentionCheck(Number(la), 1.9, 4);
    aortaResult = dimentionCheck(Number(aorta), 2, 3.7);
    ivsResult = dimentionCheck(Number(ivs), 0.6, 1.1);
    lvWallResult = dimentionCheck(Number(lvWall), 0.6, 1.1);
    lvResult = dimentionCheck(Number(lv), 3.5, 5.7);

    // console.log('rv', rvResult);
    // console.log('la', laResult);
    // console.log('aorta', aortaResult);
    // console.log('ivs', ivsResult);
    // console.log('lvWall', lvWallResult);
    // console.log('lv', lvResult);

    /////Стінки

    wallResult = evaluateHeartWall(ivsResult, lvWallResult);

    // console.log(wallResult);

    ///Камери

    chamberResult = evaluateHeartChamber(rvResult, laResult, aortaResult, lvResult);

    // console.log(chamberResult);

    ///загальний висновок
    result = evaluateResult(wallResult, chamberResult);

    console.log(result);

    refs.result.textContent = result;
}

///Additional functions

function dimentionCheck(heartPart, min, max) {

    switch (true) {
        case isNaN(heartPart):
              Report.info('Увага', `Введіть числове значення у поле з вмістом "${heartPart}"`);
            break;
        case heartPart < 0:
            Report.info('Увага', `Введіть додатнє число у поле з вмістом "${heartPart}"`);
            break;
        case heartPart === 0:
            Report.info('Увага', `Заповніть поле з пустим вмістом`);
            break;
        case heartPart > max:
            return 'D';
            break;
        case heartPart < min:
            return 'S';
            break;
    
        default:
            return 'N';
            break;
    }
}

function evaluateHeartWall(ivs, lvWall) {
    switch (true) {
        case ivs === 'D' && lvWall === 'D':
            return "Гіпертрофія стінок лівого шлуночка. ";
            break;
        
        case ivs === 'D' && lvWall !== 'D':
            return "Гіпертрофія міжшлуночкової перегородки. ";
            break;
        
        case ivs !== 'D' && lvWall === 'D':
            return "Гіпертрофія задньої стінки лівого шлуночка. ";
            break;
    
        default:
            return 'Normal';
            break;
    }
}

function evaluateHeartChamber(rv, la, aorta, lv) {
    switch (true) {
        case rv === 'D' && la === 'D' && aorta === 'D' && lv === 'D':
            return "Дилятація всіх камер серця. "
            break;
        
        case rv === 'D' && la === 'D' && aorta !== 'D' && lv === 'D':
            return "Дилятація лівого передсердя та шлуночків серця. "
            break;
        
        case rv === 'D' && la !== 'D' && aorta === 'D' && lv === 'D':
            return "Дилятація аорти та шлуночків серця. "
            break;
        
        case rv === 'D' && la !== 'D' && aorta !== 'D' && lv === 'D':
            return "Дилятація шлуночків серця. "
            break;
        
        case rv !== 'D' && la !== 'D' && aorta !== 'D' && lv === 'D':
            return "Дилятація лівого шлуночка. "
            break;
        
        case rv === 'D' && la !== 'D' && aorta !== 'D' && lv !== 'D':
            return "Дилятація правого шлуночка. "
            break;
        
        case rv === 'D' && la === 'D' && aorta === 'D' && lv !== 'D':
            return "Дилятація правого шлуночка, лівого передсердя та висхідного відділу аорти. "
            break;
        
        case rv !== 'D' && la !== 'D' && aorta === 'D' && lv !== 'D':
            return "Дилятація висхідного відділу аорти. "
            break;
        
        case rv !== 'D' && la === 'D' && aorta !== 'D' && lv === 'D':
            return "Дилятація лівих камер серця. "
            break;
        case rv !== 'D' && la === 'D' && aorta === 'D' && lv === 'D':
            return "Дилятація лівих камер серця та висхідного відділу ворти. "
            break;
    
        default:
            return 'Normal';
            break;
    }
}
function evaluateResult(wall, chamber) {
    switch (true) {
        case wall === 'Normal' && chamber === 'Normal':
            return "Розміри камер серця в межах норми. "
            break;
        
        case wall !== 'Normal' && chamber === 'Normal':
            return wall;
            break;
        
        case wall === 'Normal' && chamber !== 'Normal':
            return chamber;
            break;
    
        default:
            return chamber + wall;
            break;
    }
}