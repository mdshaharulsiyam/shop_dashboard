export const makeFormData = (value) => {
    const formData = new FormData()
    Object.keys(value).forEach(key => {
        formData.append(key, value[key])
    })
    return formData
} 