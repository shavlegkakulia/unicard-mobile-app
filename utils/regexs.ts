export const emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
export const PasswordReg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=+\/\\#$%^&*~`}{\]\[|()_+-])[A-Za-z\d#?!$()>`}{\]\[|=+\/\\<%^&_,*-]{8,18}$/gm);
export const PhoneNumberReg = new RegExp("^[0-9]{9,16}$");
export const ContainsLowercase =  new RegExp(/^(?=.*[a-z])/gm);
export const ContainsUppercase = new RegExp(/^(?=.*[A-Z])/gm);
export const ContainsNumeric = new RegExp(/^(?=.*\d)/gm);
export const ContainsSpecialCharacter = new RegExp(/^(?=.*[!=+\/\\#$%^&*~`}{\]\[|()_+-])/gm);