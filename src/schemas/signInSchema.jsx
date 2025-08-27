import * as yup from 'yup'

export const useAccountValidation = yup.object().shape({
  username: yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers.")
    .required("Required"),

  password: yup.string()
    .min(8, "Password can not be less than 8 characters")
    .required("Required")
  })
  // .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/, "Please create a stronger password")