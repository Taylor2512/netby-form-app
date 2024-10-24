// app/components/FormList.tsx
import React, { useEffect, useState } from 'react';
import { getForms } from '../services/apiService';
import {FormResponse} from "@/app/types/FormTypes";

const FormList: React.FC = () => {
const [forms, setForms] = useState<FormResponse[]>([]);
    useEffect(() => {
        const fetchForms = async () => {
            const forms:FormResponse[] = await getForms();
            setForms(forms);
        };
        fetchForms();
    }, []);

    return (
        <div>
            <h2>Form List</h2>
            <ul>{forms.map((form: FormResponse) => (
                <li key={form.id}>{form.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FormList;