export function formDataStore(formData) {
    localStorage.setItem('formData', JSON.stringify(formData));
}

export function resultStore(result) {
    localStorage.setItem('result', result);
}