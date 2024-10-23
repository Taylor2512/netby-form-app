// app/components/FormButton.tsx
import React from 'react';

interface FormButtonProps {
    formName: string;
    onClick: () => void;
}

const FormButton: React.FC<FormButtonProps> = ({ formName, onClick }) => {
    return <button onClick={onClick}>{formName}</button>;
};

export default FormButton;
