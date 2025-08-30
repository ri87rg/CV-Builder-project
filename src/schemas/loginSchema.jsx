import * as yup from 'yup'

export const useLoginValidation = yup.object().shape({
  username: yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers.")
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  password: yup.string()
    .min(8, "Password can not be less than 8 characters")
    .required("Password is required"),
  })