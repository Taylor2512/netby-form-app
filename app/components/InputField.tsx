// app/components/InputField.tsx
import React from 'react';
import { Input } from '../types/Form';

const InputField: React.FC<Input> = ({ id, name, type, required, options }) => {
    return (
        <div className="input-field">
            <label htmlFor={id}>{name}</label>
            {type === 'select' ? (
                <select id={id} required={required}>
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
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
