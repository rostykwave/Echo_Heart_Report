export function formDataStore(formData) {
    localStorage.setItem('formData', JSON.stringify(formData));
}

export function resultStore({result, ehealthCopyResult}) {
    localStorage.setItem('result', result);
    localStorage.setItem('ehealthCopyResult', ehealthCopyResult);
}