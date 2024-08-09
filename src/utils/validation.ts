import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  lname: Yup.string().required("Last name is required"),
  fname: Yup.string().required("First name is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password Confirmation is Required"),
});

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("fill required field"),
  newPassword: Yup.string().required("fill required field"),
  newPasswordConfrim: Yup.string()
    .oneOf([Yup.ref("newPassword")], "passwords must match")
    .required("fill required field"),
});

export const subscribeSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
});
export const checkInviteEmailSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
});
