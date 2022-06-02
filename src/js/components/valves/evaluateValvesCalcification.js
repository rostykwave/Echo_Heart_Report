 ////Загальний втсновок кальцифікації всіх клапанів
export const evaluateValvesCalcification = (mitral, aortic, tricuspid, laValve) => {
    let mitralText = 'мітрального клапана';
    let aorticText = 'аортального клапана';
    let tricuspidText = 'тристулкового клапана';
    let laValveText = 'клапана легеневого артерії';

    mitralText = oneValveCalcification( mitralText, mitral);
    aorticText = oneValveCalcification( aorticText, aortic);
    tricuspidText = oneValveCalcification( tricuspidText, tricuspid);
    laValveText = oneValveCalcification(laValveText, laValve);
    
    if (mitralText.startsWith('Фіброзні') && aorticText.startsWith('Фіброзні')) {
        mitralText = `Фіброзні зміни мітрального та аортального клапанів. `;
        aorticText = '';
    }

    if (mitralText.startsWith('Стулки ущільнені') && aorticText.startsWith('Стулки ущільнені')) {
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