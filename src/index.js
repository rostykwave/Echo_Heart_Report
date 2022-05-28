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

let segmentResult = 'Spare';
let val = 'Spare';
let segm = 'Spare';
let result = 'Spare';


refs.form.addEventListener('submit', onSubmit);
// const formData = {};



///Main function
function onSubmit(e) {
    e.preventDefault();
    const formDataRaw = new FormData(e.currentTarget);
    const formData = {};
    formDataRaw.forEach((value, key) => {
        formData[key] = value;
    })
    console.log(formData);

    //Destructuring
    const { rv, la, aorta, ivs, lvWall, lv, ef } = formData;

    rvResult = dimentionCheck(Number(rv), 0.9, 2.6);
    laResult = dimentionCheck(Number(la), 1.9, 4);
    aortaResult = dimentionCheck(Number(aorta), 2, 3.7);
    ivsResult = dimentionCheck(Number(ivs), 0.6, 1.1);
    lvWallResult = dimentionCheck(Number(lvWall), 0.6, 1.1);
    lvResult = dimentionCheck(Number(lv), 3.5, 5.7);
  
    segmentResult = efCheck(Number(ef));
    
    console.log(segmentResult);

    /////Стінки

    wallResult = evaluateHeartWall(ivsResult, lvWallResult);
    // console.log(wallResult);

    ///Камери

    chamberResult = evaluateHeartChamber(rvResult, laResult, aortaResult, lvResult);
    // console.log(chamberResult);

    const ch = evaluateMainResult(wallResult, chamberResult);


    ////Клапани
    ///Недостатність клапанів///////
    const { mInsuf, aInsuf, tInsuf, laInsuf } = formData;
    const valInsuf = evaluateValvesInsufficiency(mInsuf, aInsuf, tInsuf, laInsuf);

     ///Кальциноз клапанів///////
    const { mCalc, aCalc, tCalc, laCalc } = formData;
    const valCalc = evaluateValvesCalcification(mCalc, aCalc, tCalc, laCalc);

    ///Загальний звіт по клапанах\
    const val = valInsuf + valCalc;



    segm = "Сегменти. ";
    // EF, calc
    
    


    ///загальний висновок
    result = resultOutput(ch, val, segmentResult);

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
            return '';
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
function efCheck(ef) {

    switch (true) {
        case ef === 0:
            Report.info('Увага', `Заповніть поле з пустим вмістом`);
            return '';
            break;
        
        case ef < 50:
            return 'Сумарна і сегментарна скоротливість ЛШ дифузно знижена. Фракція викиду: ${ef}%. ';
            break;
    
        default:
            return 'Сумарна сегментарна скоротливість ЛШ збережена. Фракція викиду: ${ef}%. ';
            break;
    }
}

function evaluateHeartWall(ivs, lvWall) {
    switch (true) {
        case ivs === '' || lvWall === '':
            return "";
            break;
        
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
    let rvText = '';
    let laText = '';
    let aortaText = '';
    let lvText = '';


    switch (true) {
        case rv === '' || la === '' || aorta === '' || lv === '':
            return ""
            break;
        
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
        
        case rv !== 'D' && la === 'D' && aorta !== 'D' && lv === 'D':
            return "Дилятація лівих камер серця. "
            break;
        
        ////коли хоч якась камера диляьована, і коли жодна з попередніх умов не задовольнила
        case rv === 'D' || la === 'D' || aorta === 'D' || lv === 'D':

            if (rv === 'D') {
                rvText = "правого  шлуночка, "; 
            }
            if (la === 'D') {
                laText = "лівого передсердя, "; 
            }
            if (aorta === 'D') {
                aortaText = "висхідного відділу аорти, "; 
            }
            if (lv === 'D') {
                lvText = "лівого  шлуночка, "; 
            }

            return comaDotFix(`Дилятація ${rvText}${laText}${aortaText}${lvText}. `);
            break;
    
        default:
            return 'Normal';
            break;
    }
}
function evaluateMainResult(wall, chamber) {
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

function resultOutput(ch, val, segm) {
    return ch + val + segm;
}

///Клапани
/////Оцінка недостатності клапанів
function evaluateValvesInsufficiency(mitral, aortic, tricuspid, laValve) {
    let mitralText = '';
    let aorticText = '';
    let tricuspidText = '';
    let laValveText = '';

    ////Перевірка чи введений хоч якийсь вміст
    switch (true) {
        case mitral === "" && aortic === "" && tricuspid === "" && laValve === "":
            return '';
            break;
        
        case mitral !== "" || aortic !== "" || tricuspid !== "" || laValve !== "":
           
            ////Врисування у змінну або пустоти або назву клапана і  величину недостатності
             if (mitral !== "") {
                mitralText = `мітрального клапана: ` + mitral + ', '; 
            }
            
            if (aortic !== "") {
                aorticText = `аортального клапана: ` + aortic + ', ';
            }

            if (tricuspid !== "") {
                tricuspidText = `тристулкового клапана: ` + tricuspid + ', ';;
            }

            if (laValve !== "") {
                laValveText = `клапана легеневої артерії: ` + laValve + ', ';
            }
          ////////

            return comaDotFix(`Недостатність ${mitralText}${aorticText}${tricuspidText}${laValveText}. `);
            break;
        
        default:
            return 'Normal';
            break;
    }

}
////Загальний втсновок кальцифікації всіх клапанів
function evaluateValvesCalcification(mitral, aortic, tricuspid, laValve) {
    let mitralText = 'мітрального клапана';
    let aorticText = 'аортального клапана';
    let tricuspidText = 'тристулкового клапана';
    let laValveText = 'клапана легеневого артерії';

    mitralText = oneValveCalcification( mitralText, mitral);
    aorticText = oneValveCalcification( aorticText, aortic);
    tricuspidText = oneValveCalcification( tricuspidText, tricuspid);
    laValveText = oneValveCalcification(laValveText, laValve);
    
    if (mitralText.startsWith('Фіброзні') && mitralText.startsWith('Фіброзні')) {
        mitralText = `Фіброзні зміни мітрального та аортального клапанів. `;
        aorticText = '';
    }

    if (mitralText.startsWith('Стулки ущільнені') && mitralText.startsWith('Стулки ущільнені')) {
        mitralText = `Стулки мітрального та аортального клапанів ущільнені. `;
        aorticText = '';
    }

    

    return mitralText + aorticText + tricuspidText + laValveText;
}
///Оцінка кальцифікації лише одного клапана
function oneValveCalcification(valveName, valveResult) {
    switch (true) {
        case valveResult === 'Стулки ущільнені':
            return `Стулки ${valveName} ущільнені. `
            break;
        
        case valveResult === 'Фіброзні зміни' || valveResult === 'Са задньої стулки':
            return `${valveResult} ${valveName}. `;
            break;
        
        case valveResult === 'Відносний':
            return `${valveResult} кальциноз ${valveName}. `
            break;
        
        case valveResult.endsWith('+'):
            return `Кальциноз ${valveName} ${valveResult}. `
            break;
    
        default:
            return '';
            break;
    }
}
///Функція яка бачить рядок ", ." заміняє на ". "
function comaDotFix(propString) {
    // if (propString.endsWith(', . ')) {
    //     return propString.replace(", . ", ". ");
    // }

    const pattern = /, . $/ig;

    if (pattern.test(propString)) {
        return propString.replace(pattern, ". ");
    }

    console.log('Рядок не пройшов перевірку патерном: ', propString.match(pattern));
    console.log(pattern.test(propString));

}