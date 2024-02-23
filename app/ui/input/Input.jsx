"use client";
import { nunito } from "@/app/lib/fonts";
import styles from "@/app/ui/input/input.module.css";

export default function Input(
    {
        name,
        label,
        inputtype,
        placeholder,
        id,
        errorText,
        required,
        onChange,
        onBlur,
    }){

        function handleChange(event){
            if(event.target.type === "checkbox"){
                onChange(name, event.target.checked);
            }else{
                onChange(name, event.target.value);
            }
        }

        function handleBlur(){
            onBlur(name);
        }

        return(
            <div className={`${styles.inputContainer} ${inputtype === "checkbox" ? styles.checkbox : undefined}`}>
                <div className={styles.labelBox}>
                    {label ? <label htmlFor={id}>{label}</label> : ""}
                    <p className={`${errorText ? styles.errorMessage : styles.hidden}`}>{errorText}</p>
                </div>
                <input
                    type={inputtype}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    className={`${errorText ? "error" : ""}`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </div>
        )
}