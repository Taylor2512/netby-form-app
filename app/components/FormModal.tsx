// app/components/FormModal.tsx
import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { FormRequest } from '@/app/types/FormTypes';
import '../styles/FormModal.css';
import InputField from "@/app/components/InputField";
import EditOptions from "@/app/components/EditOptionsProps";

const FormModal: React.FC = () => {
    const { inputs, formId, handleOptionsChange, handleSubmit, handleDelete } = useForm();

    useEffect(() => {
        // Fetch form data if formId is available
        if (formId) {
            // Fetch form data logic here if needed
        }
    }, [formId]);

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
        <div className="form-modal">
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
        </div>
    );
};

export default FormModal;