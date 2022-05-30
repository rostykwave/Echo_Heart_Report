export const diastolicRes = (diastolDysf, diastolDysfPlus) => {
    if (diastolDysf && diastolDysfPlus) {
         return `Діастолічне наповнення: ДД ${diastolDysf}, ${diastolDysfPlus}. `;
    }

    if (diastolDysfPlus) {
         return `Діастолічне наповнення: ${diastolDysfPlus}. `;
    }

    if (diastolDysf) {
         return `Діастолічне наповнення: ДД ${diastolDysf}. `;
    }
    return '';
   
}