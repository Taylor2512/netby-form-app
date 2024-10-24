// components/CreateForm.tsx
import React from 'react';
import InputField from './InputField';
import { useForm } from '../hooks/useForm';
import { FormRequest } from '@/app/types/FormTypes';
import '../styles/CreateForm.css';
import EditOptions from "@/app/components/EditOptionsProps";

const CreateForm: React.FC = () => {
    const { inputs, formId, handleOptionsChange, handleSubmit, handleDelete } = useForm();

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData: FormRequest = {
            name: 'Form Name',
            inputs: inputs.map(input => ({
                name: input.name,
                inputType: input.type,
                isRequired: input.required ?? false,
                options: input.options ?? [],
            })),
        };
        handleSubmit(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            {inputs.map((input, index) => (
                <div key={input.id}>
                    <InputField {...input} />
                    {input.type === 'select' && (
                        <EditOptions
                            options={input.options || []}
                            onOptionsChange={(newOptions) => handleOptionsChange(index, newOptions)}
                        />
                    )}
                </div>
            ))}
            <button type="submit">{formId ? 'Update Form' : 'Create Form'}</button>
            {formId && (
                <button type="button" onClick={handleDelete}>
                    Delete Form
                </button>
            )}
        </form>
    );
};

export default CreateForm;
