import './sass/main.scss';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { refs } from './js/refs';

///Helpers
import { comaDotFix } from './js/helpers/comaDotFix';
import {onRightAndLeftArrows} from './js/helpers/onRightAndLeftArrows';
///////\\Helpers

////Valves
import { evaluateValvesInsufficiency } from './js/components/valves/evaluateValvesInsufficiency';
import { evaluateValvesCalcification } from './js/components/valves/evaluateValvesCalcification';
import { valvesAddInfo } from './js/components/valves/valvesAddInfo';
////////\\Valves

import { pulmoHypert } from './js/components/pulmonaryHypertension';
import { pericardialFluidRes } from './js/components/pericardialFluidRes';
import { diastolicRes } from './js/components/diastolic';

import { segmentsRes } from './js/components/segments';
import { segmentsRender } from './js/components/segments';



import { efREs } from './js/components/ef';

import { copyResult } from './js/result/copyResult'; 



let rvResult = 'Spare';
let laResult = 'Spare';
let aortaResult = 'Spare';
let ivsResult = 'Spare';
let lvWallResult = 'Spare';
let lvResult = 'Spare';
let wallResult = 'Spare';
let chamberResult = 'Spare';
// let segments = 'Spare';
// let segmentResult = 'Spare';
let val = 'Spare';
// let segmDisplay = 'Spare';
let result = 'Spare';


refs.form.addEventListener('submit', onSubmit);
///Переміщення між інпутами
document.addEventListener('keydown', onRightAndLeftArrows);


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

    ////ADD клапанів///////
    const { mAdd, aAdd, tAdd, laAdd } = formData;
    const valvAdd = valvesAddInfo(mAdd, aAdd, tAdd, laAdd);

   

    ///Загальний звіт по клапанах\
    const val = valInsuf + valCalc + valvAdd;



    const { pulmonaryHypertension, perFluid, diastolDysf, diastolDysfPlus } = formData;

    // new consts
    
    const pulmoHypertResult = pulmoHypert(pulmonaryHypertension);

    const pericardialFluidResult = pericardialFluidRes(perFluid);
    const diastolicResult = diastolicRes(diastolDysf, diastolDysfPlus);

    const segmentResult = segmentsRes(formData, Number(ef));
    const efResult = efREs(ef);
    const segmTextCopy = segmentsRender(formData);
    


    ///загальний висновок
    result = resultOutput(ch, val,pulmoHypertResult, pericardialFluidResult,  diastolicResult, segmentResult, efResult);
    // console.log(result);
    refs.result.textContent = result;


    ///Висновок для копіювання в медичний звіт
    // const copyResult = 'ggdg';
    refs.copyRes.textContent = copyResult(formData,result,segmTextCopy);
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

function resultOutput(ch, val, pulmo, pericardFluid, diastolic, segm, ef) {
    if (segm.startsWith('Порушення')) {
       return segm + ef + ch + val + pulmo + pericardFluid + diastolic; 
    }
    return ch + val + pulmo + pericardFluid+ diastolic + segm + ef;
}