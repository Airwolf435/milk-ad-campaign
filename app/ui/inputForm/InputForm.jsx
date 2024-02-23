"use client";

import styles from "@/app/ui/inputForm/inputForm.module.css"
import Input from "@/app/ui/input/Input";
import { validateAlpha, validateBirthday, validateBoolean, validateEmail, validateName, validateNumeric, validatePhoneNumber, validatePostalCode, validateProvince, validateStreetAddress } from "@/app/lib/validators";
import { useEffect, useState } from "react";
import { guardianConsentRequired, invalidAddress, invalidBirthday, invalidCity, invalidEmail, invalidFirstName, invalidLastName, invalidPhone, invalidPostal, invalidProvince, invalidStreetNumber, privacyConsentRequired} from "@/app/lib/errorMessages";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function InputForm(){
    const [clientFormData, setClientFormData] = useState({
        clientFName: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateAlpha
        },
        clientLName: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateAlpha
        },
        clientDOB: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateBirthday
        },
        clientEmail: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateEmail
        },
        clientPhone: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validatePhoneNumber
        },
        clientStreetNumber: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateNumeric
        },
        clientStreetAddress: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateAlpha
        },
        clientCity:{
            value: undefined,
            valid: undefined,
            hasChanged: false,
            validator: validateAlpha,
        },
        clientProvince:{
            value: undefined,
            valid: undefined,
            hasChanged: false,
            validator: validateProvince
        },
        clientPostal: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validatePostalCode
        },
        clientPrivacyConsent: {
            value: undefined,
            valid: undefined,
            hasChanged: false,
            validator: validateBoolean
        },
        clientCommunicationConsent: {
            value: false,
            valid: true,
            hasChanged: false,
            validator: validateBoolean
        },
        
    })

    const [guardianFormData, setGuardianFormData] = useState({
        guardianFName: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateAlpha
        },
        guardianLName: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateAlpha
        },
        guardianEmail: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateEmail
        },
        guardianPhone: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validatePhoneNumber
        },
        guardianConsent: {
            value: undefined,
            valid: false,
            hasChanged: false,
            validator: validateBoolean
        }
    })

    const [formPage, setFormPage] = useState("client");
    const [hasError, setHasError] = useState(true);
    const [requireGuardian, setRequireGuardian] = useState(undefined);
    const [revealEasterEgg, setRevealEasterEgg] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(clientFormData.clientDOB.valid){
            let splitDate = clientFormData.clientDOB.value.split("/");
            let today =  new Date();
            let birthday = new Date(splitDate[2], splitDate[1], splitDate[0]);
            let minimumDate = new Date(today.getFullYear() - 18, today.getUTCMonth() + 1, today.getDate());
            setRequireGuardian(birthday > minimumDate);
        }
        if(clientFormData.clientDOB.value === "173467321476Charlie32789777643Tango732Victor73117888732476789764376 Lock"){
            router.push("https://youtu.be/bl5TUw7sUBs?si=Ook2JfQE7VIXqoIS&t=91");
        }
    }, [clientFormData]);

    async function verifyField(fieldName){
        if(formPage === "client"){
            let record ={
                ...clientFormData[`${fieldName}`]
            };
            return record.validator(record.value).then((result)=>{
                updateClientRecord(fieldName, {
                    ...record,
                    valid: result
                })
            });
        }else{
            console.log(fieldName)
            let record ={
                ...guardianFormData[`${fieldName}`]
            };
            console.log(record);
            return record.validator(record.value).then((result)=>{
                updateGuardianRecord(fieldName, {
                    ...record,
                    valid: result
                })
            });
        }
    }

    function updateClientRecord(fieldName, value){
        let records = {...clientFormData};
        records[`${fieldName}`] = value;
        setClientFormData(records);
    }

    function updateGuardianRecord(fieldName, value){
        let records = {...guardianFormData};
        records[`${fieldName}`] = value;
        setGuardianFormData(records);
    }

    function handleCheckbox(fieldName, value){
        if(formPage === "client"){
            clientFormData[`${fieldName}`].validator(value).then((res)=>{
                let records = {...clientFormData};
                records[`${fieldName}`].value = value;
                records[`${fieldName}`].valid = res;
                setClientFormData(records);
            })
        }else{
            guardianFormData[`${fieldName}`].validator(value).then((res)=>{
                let records = {...guardianFormData};
                records[`${fieldName}`].value = value;
                records[`${fieldName}`].valid = res;
                setGuardianFormData(records);
            })
        }
    }

    function handleChange(fieldName, value){
        if(formPage === "client"){
            updateClientRecord(fieldName, {
                ...clientFormData[`${fieldName}`],
                value: value,
                hasChanged: true,
            })
        }else{
            updateGuardianRecord(fieldName, {
                ...guardianFormData[`${fieldName}`],
                value: value,
                hasChanged: true,
            })
        }
    }

    function scanDataForValid(){
        for(let record in clientFormData){
            if(!clientFormData[record].valid){
                return false;
            };
        }

        if(requireGuardian){
            for(let record in guardianFormData){
                if(!guardianFormData[record].valid){
                    return false;
                };
            }
        }
        return true;
    }

    function validateGuardianConsent(){
        if(requireGuardian){
            return !guardianFormData.guardianConsent.value
        }else{
            return false
        }
    }

    function handleBlur(fieldName){
        verifyField(fieldName);
    }

    function handleNext(event){
        event.preventDefault();
        setFormPage("guardian");
    }

    function handlePrev(event){
        event.preventDefault();
        setFormPage("client");
    }

    function handleSubmit(event){
        event.preventDefault();
        if(scanDataForValid()){
            setFormPage("complete");
            localStorage.setItem("permitContest", true);
            if(requireGuardian){
                console.log(guardianFormData);
            }
            setTimeout(()=>{})
        }else{
            console.log("failed");
            console.log(clientFormData.clientPrivacyConsent.value);
        }
    }

    return(
        <form action="" className={styles.form}>
            <section className={`clientPage ${formPage === "client" ? styles.visible : styles.hiddenPage} ${styles.formPage}`}>
                <Input
                    name="clientFName"
                    label="First Name:"
                    inputtype="text"
                    placeholder="John"
                    id="clientFName"
                    required={true}
                    errorText={
                        clientFormData.clientFName.valid === false && clientFormData.clientFName.hasChanged ? invalidFirstName : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input 
                    name="clientLName"
                    label="Last Name:"
                    inputtype="text"
                    placeholder="Doe"
                    id="clientLName"
                    required={true}
                    errorText={
                        clientFormData.clientLName.valid === false && clientFormData.clientLName.hasChanged ? invalidLastName : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientStreetNumber"
                    label="Street Number:"
                    inputtype="text"
                    placeholder="50"
                    id="clientStreetNumber"
                    required={true}
                    errorText={
                        clientFormData.clientStreetNumber.valid === false && clientFormData.clientStreetNumber.hasChanged ? invalidStreetNumber : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                
                />
                <Input
                    name="clientStreetAddress"
                    label="Street Name:"
                    inputtype="text"
                    placeholder="John Doe Street"
                    id="clientStreetAddress"
                    required={true}
                    errorText={
                        clientFormData.clientStreetAddress.valid === false && clientFormData.clientStreetAddress.hasChanged ? invalidAddress : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientCity"
                    label="City:"
                    inputtype="text"
                    placeholder="Oshawa"
                    id="clientCity"
                    required={true}
                    errorText={
                        clientFormData.clientCity.valid === false && clientFormData.clientCity.hasChanged ? invalidCity : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientProvince"
                    label="Province:"
                    inputtype="text"
                    placeholder="ON"
                    id="clientProvince"
                    required={true}
                    errorText={
                        clientFormData.clientProvince.valid === false && clientFormData.clientProvince.hasChanged ? invalidProvince : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientPostal"
                    label="Postal Code:"
                    inputtype="text"
                    placeholder="XXX-XXX"
                    id="clientPostal"
                    required={true}
                    errorText={
                        clientFormData.clientPostal.valid === false && clientFormData.clientPostal.hasChanged ? invalidPostal : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input 
                    name="clientPhone"
                    label="Phone:"
                    inputtype="tel"
                    placeholder="XXX - XXX - XXXX"
                    id="clientPhone"
                    required={true}
                    errorText={
                        clientFormData.clientPhone.valid === false && clientFormData.clientPhone.hasChanged ? invalidPhone : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientEmail"
                    label="Email:"
                    inputtype="email"
                    placeholder="JohnDoe@email.com"
                    id="clientEmail"
                    required={true}
                    errorText={
                        clientFormData.clientEmail.valid === false && clientFormData.clientEmail.hasChanged ? invalidEmail : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input 
                    name="clientDOB"
                    label="Date of Birth:"
                    inputtype="text"
                    placeholder="DD/MM/YY"
                    id="clientDOB"
                    required={true}
                    errorText={
                        clientFormData.clientDOB.valid === false && clientFormData.clientDOB.hasChanged ? invalidBirthday : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientCommunicationConsent"
                    label="I consent to receiving communications regarding milk products and sponsors"
                    inputtype="checkbox"
                    id="clientCommunicationConsent"
                    required={false}
                    onChange={handleCheckbox}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientPrivacyConsent"
                    label="I consent to rules and regulations"
                    inputtype="checkbox"
                    id="clientPrivacyConsent"
                    required={true}
                    errorText={
                        clientFormData.clientPrivacyConsent.value === false && hasError ? privacyConsentRequired : undefined
                    }
                    onChange={handleCheckbox}
                    onBlur={handleBlur}
                />
            </section>
            <section className={`guardianPage ${formPage === "guardian" ? styles.visible : styles.hiddenPage}  ${styles.formPage}`}>
                <Input
                    name="guardianFName"
                    label="Guardian First Name:"
                    inputtype="text"
                    placeholder="John"
                    id="guardianFName"
                    required={true}
                    errorText={
                        guardianFormData.guardianFName.valid === false && guardianFormData.guardianFName.hasChanged ? invalidFirstName : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="guardianLName"
                    label=" Guardian Last Name:"
                    inputtype="text"
                    placeholder="Doe"
                    id="guardianLName"
                    required={true}
                    errorText={
                        guardianFormData.guardianLName.valid === false && guardianFormData.guardianLName.hasChanged ? invalidLastName : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="guardianPhone"
                    label="Phone Number:"
                    inputtype="tel"
                    placeholder="XXX - XXX - XXXX"
                    id="guardianPhone"
                    required={true}
                    errorText={
                        guardianFormData.guardianPhone.valid === false && guardianFormData.guardianPhone.hasChanged ? invalidPhone : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="guardianEmail"
                    label="Guardian Email:"
                    inputtype="text"
                    placeholder="John.Doe@gmail.com"
                    id="guardianEmail"
                    required={true}
                    errorText={
                        guardianFormData.guardianEmail.valid === false && guardianFormData.guardianEmail.hasChanged ? invalidEmail : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="guardianConsent"
                    label="I a legal guardian give consent for the user
                    under the age of 18 to use this site"
                    inputtype="checkbox"
                    id="guardianPhone"
                    required={true}
                    errorText={
                        guardianFormData.guardianConsent.valid === false && guardianFormData.guardianConsent.hasChanged ? guardianConsentRequired : undefined
                    }
                    onChange={handleCheckbox}
                    onBlur={handleBlur}
                />
            </section>
            <section className={`${styles.completePage} ${formPage === "complete" ? styles.visible : styles.hiddenPage}`}>
                    <h2>Get Ready To Shine</h2>
                    <p>Thank you for submitting your entry</p>
                    <Link href="/contest">Click here to participate!</Link>
            </section>
            <div className={styles.formControls}>
                {requireGuardian && formPage === "guardian" ? <button onClick={handlePrev}>Go Back</button> : undefined}
                {requireGuardian && formPage === "client" ? <button onClick={handleNext}>Next</button> : undefined}
                {(!requireGuardian || (requireGuardian && formPage === "guardian")) && formPage !== "complete" ? <button inputtype="submit" onClick={handleSubmit} disabled={!scanDataForValid() || !clientFormData.clientPrivacyConsent.value || validateGuardianConsent()}>Submit</button> : undefined}
            </div>
        </form>
    )
}