export const valvesAddInfo = (mAdd, aAdd, tAdd, laAdd) => {
    let r = '';

     if (mAdd || aAdd || tAdd || laAdd) {
        
           r = `Додаткові дані. `;
    }
    
    
    if (mAdd) {
        r += `МК: ${mAdd}. `
    }
    if (aAdd) {
        r += `АК: ${aAdd}. `
    }
    if (tAdd) {
        r += `ТК: ${tAdd}. `
    }
    if (laAdd) {
        r += `ЛК: ${laAdd}. `
    }
 
    return r;
}