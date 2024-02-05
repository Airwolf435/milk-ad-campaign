"use client";

import styles from "@/app/ui/inputForm/inputForm.module.css"
import Input from "@/app/ui/input/Input";
import { validateAddress, validateBirthday, validateBoolean, validateEmail, validateName, validatePhoneNumber, validatePostalCode } from "@/app/lib/validators";
import { useEffect, useState } from "react";
import Image from "next/image";
import { guardianConsentRequired, invalidAddress, invalidBirthday, invalidEmail, invalidFirstName, invalidLastName, invalidPhone, invalidPostal, privacyConsentRequired} from "@/app/lib/errorMessages";



export default function InputForm(){
    const [clientFormData, setClientFormData] = useState({
        clientFName: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateName
        },
        clientLName: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateName
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
        clientAddress: {
            value: "",
            valid: undefined,
            hasChanged: false,
            validator: validateAddress
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
            value: undefined,
            valid: undefined,
            hasChanged: false,
            validator: validateBoolean
        },
        
    })

    const [guardianFormData, setGuardianFormData] = useState({
        guardianFName: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateName
        },
        guardianLName: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateName
        },
        guardianDOB: {
            value: "",
            valid: false,
            hasChanged: false,
            validator: validateBirthday
        },
        guardianPhone: {
            value: "",
            valid: false,
            hasChanged: false,
            validate: validatePhoneNumber
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

    useEffect(()=>{
        if(clientFormData.clientDOB.valid){
            let splitDate = clientFormData.clientDOB.value.split("/");
            let today =  new Date();
            let birthday = new Date(splitDate[2], splitDate[1], splitDate[0]);
            let minimumDate = new Date(today.getFullYear() - 18, today.getUTCMonth() + 1, today.getDate());
            setRequireGuardian(birthday > minimumDate);
        }

        let errorFound = false;

        for(let record in clientFormData){
            verifyField(record).then(()=>{
                if(!errorFound){
                    errorFound = clientFormData[record].valid;
                }
            });
        }

        if(requireGuardian && !errorFound && formPage === "guardian"){
            
            for(let record in guardianFormData){
                verifyField(record).then(()=>{
                    if(!errorFound){
                        errorFound = guardianFormData[record].valid;
                    }
                });
            }
        }

        if(errorFound){
            setHasError(true);
        }else{
            setHasError(false);
        }
    }, [clientFormData, guardianFormData]);

    async function verifyField(fieldName){
        console.log(fieldName);
        if(formPage === "client"){
            return clientFormData[`${fieldName}`].validator(clientFormData[`${fieldName}`].value).then((result)=>clientFormData[`${fieldName}`].valid = result);
        }else{
            return guardianFormData[`${fieldName}`].validator(guardianFormData[`${fieldName}`].value).then((result)=>guardianFormData[`${fieldName}`].valid = result);
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
            if(!guardianFormData[record].valid){
                return false;
            };
        }
        
        return true;
    }

    console.log(scanDataForValid());

    function handleBlur(fieldName){
        verifyField(fieldName);
        // verifyField(fieldName, value, (result)=>{
        //     if(formPage === "client"){
        //         updateClientRecord(fieldName, {
        //             ...clientFormData[`${fieldName}`],
        //             value: value,
        //             valid: result,
                    
        //         })
        //     }else{
        //         updateGuardianRecord(fieldName, {
        //             ...guardianFormData[`${fieldName}`],
        //             value: value,
        //             valid: result,
                    
        //         })
        //     }
        // })
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
        console.log("Submit Requested")
        console.log(hasError)
    }

    return(
        <form action="">
            <section className={`clientPage ${formPage === "client" ? styles.visible : styles.hiddenPage}`}>
                <div className="flex">
                    <Input
                        name="clientFName"
                        label="Name:"
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
                </div>
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
                    name="clientAddress"
                    label="Street Address:"
                    inputtype="text"
                    placeholder="536 John Doe Street"
                    id="clientAddress"
                    required={true}
                    errorText={
                        clientFormData.clientAddress.valid === false && clientFormData.clientAddress.hasChanged ? invalidAddress : undefined
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
                    name="clientPrivacyConsent"
                    label="I consent to all privacy requirements and regulations"
                    inputtype="checkbox"
                    id="clientPrivacyConsent"
                    required={true}
                    errorText={
                        clientFormData.clientPrivacyConsent.value === false && hasError ? privacyConsentRequired : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="clientCommunicationConsent"
                    label="I consent to recieve communications about products and promotions"
                    inputtype="checkbox"
                    id="clientCommunicationConsent"
                    required={false}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </section>
            <section className={`guardianPage ${formPage === "guardian" ? styles.visible : styles.hiddenPage}`}>
                <Input
                    name="guardianFName"
                    label="Guardian Name:"
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
                    label=""
                    inputtype="text"
                    placeholder="Doe"
                    id="guardianLName"
                    required={true}
                    errorText={
                        guardianFormData.guardianLName.valid === false && guardianFormData.guardianLName.hasChanged ? invalidFirstName : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input
                    name="guardianDOB"
                    label="Birthday"
                    inputtype="text"
                    placeholder="DD/MM/YYYY"
                    id="guardianDOB"
                    required={true}
                    errorText={
                        guardianFormData.guardianDOB.valid === false && guardianFormData.guardianDOB.hasChanged ? invalidBirthday : undefined
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
                    name="guardianConsent"
                    label="I a legal guardian give consent for the user
                    under the age of 18 to use this site"
                    inputtype="checkbox"
                    id="guardianPhone"
                    required={true}
                    errorText={
                        guardianFormData.guardianConsent.valid === false && guardianFormData.guardianConsent.hasChanged ? guardianConsentRequired : undefined
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </section>
            <section className={`completeModal ${formPage === "complete" ? styles.visible : styles.hiddenPage}`}>
                    <Image/>
                    <h2>Get Ready To Shine</h2>
                    <p>Thank you for submitting your entry</p>
                    <button>Next</button>
            </section>
            <div>
                {requireGuardian && formPage === "guardian" ? <button onClick={handlePrev}>Previous</button> : undefined}
                {requireGuardian && formPage === "client" ? <button onClick={handleNext}>Next</button> : undefined}
                {!requireGuardian || (requireGuardian && formPage === "guardian") ? <button inputtype="submit" onClick={handleSubmit} disabled={!scanDataForValid()}>Submit</button> : undefined}
            </div>
        </form>
    )
}