// app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import FormButton from './components/FormButton';
import FormModal from './components/FormModal';
import CreateForm from './components/CreateForm';
import { getForms } from './services/apiService'; // Asegúrate de importar el servicio para obtener los formularios
import { FormResponse } from '@/app/types/FormTypes'; // Asegúrate de importar el tipo correcto de formulario

const HomePage: React.FC = () => {
    const [forms, setForms] = useState<FormResponse[]>([]); // Estado para almacenar los formularios
    const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

    // Cargar los formularios al montar el componente
    useEffect(() => {
        const fetchForms = async () => {
            try {
                const fetchedForms = await getForms();
                setForms(fetchedForms);
            } catch (error) {
                console.error("Error fetching forms:", error);
            }
        };

        fetchForms();
    }, []);

    return (
        <div>
            <h1>Dynamic Forms</h1>
            <CreateForm />
            <div className="form-buttons">
                {forms.map((form) => (
                    <FormButton
                        key={form.id}
                        formName={form.name}
                        onClick={() => setSelectedFormId(form.id)}
                    />
                ))}
            </div>
            {selectedFormId && (
                <FormModal formId={selectedFormId} onClose={() => setSelectedFormId(null)} />
            )}
        </div>
    );
};

export default HomePage;
