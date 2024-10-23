"use client"; 

import React, { useState } from 'react';
import { Input } from '../types/Form'; // Asegúrate de importar tu tipo Input

const CreateForm: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [inputs, setInputs] = useState<Input[]>([{ id: '', name: '', type: 'text', required: false }]);

  const handleInputChange = <K extends keyof Input>(index: number, field: K, value: Input[K]) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, { id: '', name: '', type: 'text', required: false }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: formName, inputs }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New Form Created:', data);
        setFormName('');
        setInputs([{ id: '', name: '', type: 'text', required: false }]);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <input
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Form Name"
        required
        className="input-field border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {inputs.map((input, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <input
            type="text"
            value={input.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            placeholder="Input Name"
            required
            className="input-field border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={input.type}
            onChange={(e) => handleInputChange(index, 'type', e.target.value as Input['type'])}
            className="input-field border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
          </select>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={input.required}
              onChange={(e) => handleInputChange(index, 'required', e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">Required</label>
          </div>
          <button
            type="button"
            onClick={addInput}
            className="btn bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
          >
            Add Input
          </button>
        </div>
      ))}
      <button
        type="submit"
        className="btn bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300"
      >
        Create Form
      </button>
    </form>
  );
};

export default CreateForm;
