import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string().email("Invalid Email Address"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password Confirmation is Required"),
});
