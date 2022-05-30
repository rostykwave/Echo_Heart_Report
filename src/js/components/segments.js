import { Report } from 'notiflix/build/notiflix-report-aio';

export const segmentsRes = (formData, ef) => {
    // console.log('segments');

    // console.log(ef);
    if (ef === 0) {
       Report.info('Увага', `Заповніть поле з даними Фракції викиду`);
            return ''; 
    }
       
    for (const key in formData) {

        if (key.startsWith('segm')) {
            if (formData[key] !== 'N' && formData[key] !== 'X') {
                return `Порушення сегментарної скоротливості (див. табл.). `;
            }
        }
    }

    // if (ef < 50) {
    //     return `Сумарна і сегментарна скоротливість ЛШ дифузно знижена. `;
    // } else {
    //     return `Сумарна сегментарна скоротливість ЛШ збережена. `;
    
    // } 

    return `Сумарна і сегментарна скоротливість ЛШ ${ef < 50 ? 'дифузно знижена' : 'збережена'}. `;

}

export const segmentsRender = (formData) => {
    const segmArray = [];

    for (const key in formData) {

        if (key.startsWith('segm')) {
            segmArray.push(formData[key])
        }
    }

    return segmArray.join('-');
}