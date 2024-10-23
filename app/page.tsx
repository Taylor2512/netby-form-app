"use client"; // Asegúrate de agregar esto al principio
import React, { useEffect, useState } from 'react';
import FormButton from './components/FormButton';
import FormModal from './components/FormModal';
import CreateForm from './components/CreateForm'; // Importa el nuevo componente
import { Form } from './types/Form';

const HomePage: React.FC = () => {
    const [forms, setForms] = useState<Form[]>([]);
    const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/forms')
            .then((response) => response.json())
            .then((data: Form[]) => setForms(data));
    }, []);

    return (
        <div>
            <h1>Dynamic Forms</h1>
            <CreateForm /> {/* Agrega el componente aquí */}
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
