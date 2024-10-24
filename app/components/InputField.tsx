// app/components/InputField.tsx
import React from 'react';
import '../styles/InputField.css';
import {InputResponse} from "@/app/types/FormTypes";
const InputField: React.FC<InputResponse> = ({ id, name, type, required, options }) => {
    return (
        <div className="input-field">
            <label htmlFor={id}>{name}</label>
            {type === 'select' ? (
                <select id={id} required={required}>
                    {options?.map((option) => (
                        <option key={option.id} value={option.optionValue}>
                            {option.displayText}
                        </option>
                    ))}
                </select>
            ) : (
                <input id={id} name={name} type={type} required={required} />
            )}
        </div>
    );
};

export default InputField;