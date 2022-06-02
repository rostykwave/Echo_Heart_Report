import { comaDotFix } from '../../helpers/comaDotFix';
 
 /////Оцінка недостатності клапанів
export const evaluateValvesInsufficiency = (mitral, aortic, tricuspid, laValve) => {
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