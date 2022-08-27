const FormDataAppend = (formData, data, keys) => {
    let index = 0;
    for (let field in data) {
        formData.append(keys[index], data[field]);
        console.log(formData);
        index++;
    }
    return formData;
}
export { FormDataAppend }
