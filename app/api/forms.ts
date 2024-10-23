import { NextApiRequest, NextApiResponse } from 'next';

let forms = [
    {
        id: '1',
        name: 'Personal Data Form',
        inputs: [
            { id: 'name', name: 'Name', type: 'text', required: true },
            { id: 'dob', name: 'Date of Birth', type: 'date', required: true },
            { id: 'height', name: 'Height (cm)', type: 'number', required: false },
        ],
    },
    {
        id: '2',
        name: 'Pet Data Form',
        inputs: [
            { id: 'species', name: 'Species', type: 'text', required: true },
            { id: 'breed', name: 'Breed', type: 'text', required: true },
            { id: 'color', name: 'Color', type: 'text', required: false },
        ],
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json(forms);
    } else if (req.method === 'POST') {
        const newForm = JSON.parse(req.body);
        newForm.id = String(forms.length + 1); // Asigna un nuevo ID
        forms.push(newForm);
        res.status(201).json(newForm);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        forms = forms.filter((form) => form.id !== id);
        res.status(204).end(); // No content
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
