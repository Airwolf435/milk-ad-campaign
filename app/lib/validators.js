"use client";

const alphaOnlyPattern = new RegExp(/^[a-zA-Z]+$/);
const numericOnlyPattern = new RegExp(/^[0-9]+$/)
const phoneNumberPattern = new RegExp(/^(\([0-9]{3}\)|[0-9]{3})-?[0-9]{3}-?[0-9]{4}$/);
const addressPattern = new RegExp(/^[0-9]{1,4}(\s[a-zA-Z]+)+$/);
const emailPattern = new RegExp(/^[a-zA-Z0-9-_]+[.]?[a-zA-Z0-9-_]*@[a-zA-Z0-9-_]+.[a-zA-Z]{2,3}$/);
const birthdayPattern = new RegExp(/^[0-3][0-9]\/[01][0-9]\/[12][0-9]{3}$/);
const boolPattern = new RegExp(/^(True|true|False|false|0|1|on|off){1}$/);
const postalCodePattern = new RegExp(/^[a-zA-Z][0-9][a-zA-Z]-?[0-9][a-zA-Z][0-9]$/);
const provinceCodePattern = new RegExp(/^(ab|alberta|bc|british columbia|mb|manitoba|nb|new brunswick|NL|nl|newfoundland and labrador|nt|northwest territories|ns|nova scotia|nu|nunavut|on|ontario|pe|prince edward island|qc|quebec|sk|saskatchewan|yt|yukon){1}$/);

export async function validateAlpha(str){
    return alphaOnlyPattern.test(str);
}

export async function validateNumeric(str){
    return numericOnlyPattern.test(str);
}

export async function validatePhoneNumber(str){
    return phoneNumberPattern.test(str);
}

export async function validateStreetAddress(str){
    return addressPattern.test(str);
}

export async function validatePostalCode(str){
    return postalCodePattern.test(str);
}

export async function validateEmail(str){
    return emailPattern.test(str);
}

export async function validateBirthday(str){
    //Verify string matches expected pattern for further parsing.
    if(birthdayPattern.test(str)){
        let splitStr = str.split("/");
        let year = Number(splitStr[2]);
        let month = Number(splitStr[1]);
        let day = Number(splitStr[0]);
        let today = new Date();
        let isLeapYear = (year % 4) === 0;
        // Verify the supplied year does not exceed the current year
        if(year <= new Date().getFullYear()){
            // Verify if the month supplied is between 1 and 12
            if(month <= 12 && month > 0){
                //Verify the day number is greater than zero AND does not exceed the max for the indicated month
                let daysPerMonth = [31, [28,29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                let isFeburaruy = month === 2;
                if(day > 0 && ((isFeburaruy && isLeapYear && day <= daysPerMonth[1][1]) || (isFeburaruy && !isLeapYear && day <= daysPerMonth[1][0]) || (!isFeburaruy && day <= daysPerMonth[month - 1]))){
                    // Verify the entire date is not in the future.
                    if(Date.UTC(year, month, day) <= Date.UTC(today.getFullYear(), today.getUTCMonth() + 1, today.getDate())){
                        return true;
                    }
                }
            }
        }
        
    }
    return false;
}

export async function validateBoolean(str){
    return boolPattern.test(str);
}

export async function validateProvince(str){
    
    return provinceCodePattern.test(str ? str.toLowerCase() : undefined);
}