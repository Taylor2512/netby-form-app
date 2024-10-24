// services/apiService.ts
import axios from 'axios';
import { FormRequest, FormResponse } from '@/app/types/FormTypes';

const API_URL = 'https://localhost:7069/api/forms'; // Usa rutas relativas en lugar de URLs completas.

export const createForm = async (formData: FormRequest) => {
    const response = await axios.post<FormResponse>(API_URL, formData);
    return response.data;
};

export const getForms = async (): Promise<FormResponse[]> => {
    const response = await axios.get<FormResponse[]>(API_URL);
    return response.data;
};

export const getByIdForms = async (id: string): Promise<FormResponse> => {
    const response = await axios.get<FormResponse>(`${API_URL}/${id}`);
    return response.data;
};

export const updateForm = async (id: string, formData: FormRequest) => {
    const response = await axios.put<FormResponse>(`${API_URL}/${id}`, formData);
    return response.data;
};

export const deleteForm = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
