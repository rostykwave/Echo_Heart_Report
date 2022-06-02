export const onRightAndLeftArrows = (e) => {
    
    if (e.code === 'ArrowRight') {
        e.preventDefault();

        const allInputs = document.querySelectorAll('input');
        const focucedInputs = document.querySelector('input:focus-visible');

        let focuced = 0;

        allInputs.forEach((value, key) => {
            if (value === focucedInputs) {
                focuced = key + 1;
            }

            if (focuced === key) {
                value.focus();
            }
        })
    }

    if (e.code === 'ArrowLeft') {
        e.preventDefault();

        const allInputs = document.querySelectorAll('input');
        const focucedInputs = document.querySelector('input:focus-visible');

        let focuced = 0;

        allInputs.forEach((value, key) => {
            if (value === focucedInputs) {
                focuced = key - 1;
            }
        })

        allInputs.forEach((value, key) => {
            if (focuced === key) {
                value.focus();
            }
        })
    }
}

///onArrowFocusOnNextInput