///Функція яка бачить рядок ", ." заміняє на ". "
export const comaDotFix = (propString) => {
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