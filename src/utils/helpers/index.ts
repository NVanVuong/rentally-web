export const createUserFormData = (values: any) => {
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)
    formData.append("firstName", values.firstName)
    formData.append("lastName", values.lastName)
    formData.append("phoneNumber", values.phoneNumber)
    formData.append("role", values.role)
    formData.append("photo", values.photo[0].originFileObj)

    return formData
}

export const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}
