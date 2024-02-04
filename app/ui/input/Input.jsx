import styles from "@/app/ui/input/input.module.css";
import { useState } from "react";



export default function Input(
    {
        name,
        label,
        validator,
        polymorph,
        type,
        placeholder,
        initial,
        id,
        errorText,
        forceError,
        required
    }){
        const [inputValue, setInputValue] = useState(initial);
        const [displayValue, setDisplayValue] = useState(initial);
        const [isChanged, setIsChanged] = useState(false);
        const [errorState, setErrorState] = useState(false);

        function handleChange(event){
            setInputValue(event.target.value);
            setDisplayValue(polymorph(event.target.value));
        }

        function handleBlur(){
            if(validator(inputValue)){
                errorState(false)
            }else if(isChanged){
                errorState(true);
            }
        }
        return(
            <div>
                {label ? <label for={id}>{label}</label> : ""}
                <p className={`${errorState || forceError ? "" : "hidden"}`}>{errorText}</p>
                <input
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={inputValue}
                className={`${errorText ? "error" : ""}`}
                onBlur={handleBlur}
                onChange={handleChange}>
                    {displayValue}
                </input>
            </div>
        )
}