import { Report } from 'notiflix/build/notiflix-report-aio';

export const segmentsRes = (formData, ef) => {

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

    return `Сумарна і сегментарна скоротливість ЛШ ${ef < 50 ? 'дифузно знижена' : 'збережена'}. `;

}

export const segmentsRender = (formData) => {
    const segmArray = [];

    for (const key in formData) {

        if (key.startsWith('segm')) {
            segmArray.push(formData[key])
        }
    }

    const pattern = segmArray.join('-');
    const normalPattern = 'N-N-N-N-N-N-N-N-N-N-N-N-X-N-N-X-N-N';

    return pattern === normalPattern ? '' : `Таблиця сегментів у вигляді рядка: ${pattern}. `;
}