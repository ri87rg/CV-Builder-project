import * as yup from 'yup'

export const useCVInfoValidation = yup.object().shape({
    fullName: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    phoneNumber: yup.number().positive().integer().required("Required"),
    age: yup.number().positive().integer().required("Required"),
    skills: yup.string(),
})