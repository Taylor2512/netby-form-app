// app/components/FormModal.tsx
import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import { Form } from '../types/Form';

interface FormModalProps {
    formId: string;
    onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ formId, onClose }) => {
    const [formData, setFormData] = useState<Form | null>(null);

    useEffect(() => {
        // Fetch form data from the API
        fetch(`/api/forms/${formId}`)
            .then((response) => response.json())
            .then((data: Form) => setFormData(data));
    }, [formId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit form data
        fetch(`/api/forms`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            onClose();
            // Optionally, reload the form list
        });
    };

    if (!formData) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                {formData.inputs.map((input) => (
                    <InputField key={input.id} {...input} />
                ))}
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default FormModal;
