export type IFormInput = {
    email: string;
    passWord: string;
}
export type IFormForgot = {
    email: string;
}
export type IFormRegister = {
    firstName: string;
    lastName: string;
    email: string;
    passWord: string;
    terms: boolean;
}
export type IPasswordStrengthType = {
    label: string;
    color: string;
}