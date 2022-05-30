import { refs } from "../refs";
export const copyResult = (formData, result, segmTextCopy) => {
  
    if (result === '') {
        return '';
    }

    const { rv, la, aorta, ivs, lvWall, lv, ef } = formData;

    return `Правий шлуночок ${rv} см. Ліве передсердя ${la} см. Аорта ${aorta} см. Міжшлуночкова перегородка ${ivs} см. Задня стінка ЛШ ${lvWall} см. Лівий шлуночок, КДР ${lv} см. ФВ ${ef}%. Висновок: ${result}  ${segmTextCopy}`;
 }