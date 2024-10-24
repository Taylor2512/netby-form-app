// hooks/useForm.ts
import { useState, useEffect } from 'react';
import { createForm, getForms, updateForm, deleteForm } from '../services/apiService';
import { FormRequest } from '@/app/types/FormRequest';
import { FormResponse } from '@/app/types/FormTypes';

export const useForm = () => {
    const [inputs, setInputs] = useState<FormResponse['inputs']>([]);
    const [formId, setFormId] = useState<string | null>(null);

    useEffect(() => {
        const fetchForms = async () => {
            const forms: FormResponse[] = await getForms();
            if (forms.length > 0) {
                setInputs(forms[0].inputs);
                setFormId(forms[0].id);
            }
        };
        fetchForms();
    }, []);

    const handleOptionsChange = (index: number, newOptions: FormResponse['inputs'][0]['options']) => {
        const updatedInputs = inputs.map((input, i) =>
            i === index ? { ...input, options: newOptions } : input
        );
        setInputs(updatedInputs);
    };

    const handleSubmit = async (formData: FormRequest) => {
        try {
            if (formId) {
                await updateForm(formId, formData);
                console.log('Form updated');
            } else {
                const response = await createForm(formData);
                setFormId(response.id);
                console.log('Form created with ID:', response.id);
            }
        } catch (error) {
            console.error('Error creating/updating form:', error);
        }
    };

    const handleDelete = async () => {
        if (formId) {
            try {
                await deleteForm(formId);
                setInputs([]);
                setFormId(null);
                console.log('Form deleted');
            } catch (error) {
                console.error('Error deleting form:', error);
            }
        }
    };

    return {
        inputs,
        formId,
        setInputs,
        handleOptionsChange,
        handleSubmit,
        handleDelete,
    };
};