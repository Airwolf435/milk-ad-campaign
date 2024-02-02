const alphaOnlyPattern = /^[a-zA-Z]+$/;
const phoneNumberPattern = /^(\([0-9]{3}\)|[0-9]{3})-?[0-9]{3}-?[0-9]{4}$/;
const addressPattern = /^[0-9]{1,4}(\s[a-zA-Z]+)+$/;
const emailPattern = /^[a-zA-Z0-9-_]+[.]?[a-zA-Z0-9-_]*@[a-zA-Z0-9-_]+.[a-zA-Z]{2,3}$/;
const birthdayPattern = /^[0-3][0-9]\/[0-9]{2}\/[0-9]{2}$/;
const boolPattern = /^(True|true|False|false|0|1){1}$/;


export function validateName(str){
    return str.test(alphaOnlyPattern);
}

export function validatePhoneNumber(str){
    return str.test(phoneNumberPattern);
}

export function validateAddress(str){
    return str.test(addressPattern);
}

export function validateEmail(str){
    return str.test(emailPattern);
}

export function validateBirthday(str){
    return str.test(birthdayPattern);
}

export function validateBoolean(str){
    return str.test(boolPattern);
}