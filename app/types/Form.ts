export interface Input {
    id: string;
    name: string;
    type: 'text' | 'number' | 'select';
    required?: boolean;
    options?: string[]; // Para manejar select
  }
  
export interface Form {
    id: string;
    name: string;
    inputs: Input[];
}
