"use client";
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

        function handleBlur(event){
            onBlur(name);
        }

        return(
            <div>
                {label ? <label htmlFor={id}>{label}</label> : ""}
                <p className={`${errorText ? styles.errorMessage : styles.hidden}`}>{errorText}</p>
                <input
                    type={inputtype}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    className={`${errorText ? "error" : ""}`}
                    onBlur={handleBlur}
                    onChange={inputtype !== "checkbox" ? handleChange : undefined}
                    onClick={inputtype === "checkbox" ? handleChange : undefined}
                />
            </div>
        )
}