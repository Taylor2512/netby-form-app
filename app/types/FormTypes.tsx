// types/FormTypes.ts
export interface FormInputOptionResponse {
    id: string;
    optionValue: string;
    displayText: string;
}

export interface InputResponse {
    id: string;
    name: string;
    type: 'text' | 'number' | 'select';
    required?: boolean;
    options?: FormInputOptionResponse[];
}

export interface FormRequest {
    name: string;
    inputs: InputRequest[];
}

export interface InputRequest {
    name: string;
    inputType: string;
    isRequired: boolean;
    options: OptionRequest[];
}

export interface OptionRequest {
    optionValue: string;
    displayText: string;
}

export interface FormResponse {
    id: string;
    name: string;
    inputs: InputResponse[];
}

