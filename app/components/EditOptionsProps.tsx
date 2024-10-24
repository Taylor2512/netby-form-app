// app/components/EditOptions.tsx
import '../styles/EditOptions.css';
import {FormInputOptionResponse} from "@/app/types/FormTypes";
import {useState} from "react";
interface EditOptionsProps {
    options: FormInputOptionResponse[];
    onOptionsChange: (options: FormInputOptionResponse[]) => void;
}

const EditOptions: React.FC<EditOptionsProps> = ({ options, onOptionsChange }) => {
    const [newOption, setNewOption] = useState({ id: '', optionValue: '', displayText: '' });

    const handleAddOption = () => {
        onOptionsChange([...options, { ...newOption, id: Date.now().toString() }]);
        setNewOption({ id: '', optionValue: '', displayText: '' });
    };

    const handleOptionChange = (index: number, field: string, value: string) => {
        const updatedOptions = options.map((option, i) =>
            i === index ? { ...option, [field]: value } : option
        );
        onOptionsChange(updatedOptions);
    };

    return (
        <div>
            <h3>Edit Options</h3>
            {options.map((option, index) => (
                <div key={option.id}>
                    <input
                        type="text"
                        value={option.optionValue}
                        onChange={(e) => handleOptionChange(index, 'optionValue', e.target.value)}
                        placeholder="Option Value"
                    />
                    <input
                        type="text"
                        value={option.displayText}
                        onChange={(e) => handleOptionChange(index, 'displayText', e.target.value)}
                        placeholder="Display Text"
                    />
                </div>
            ))}
            <div>
                <input
                    type="text"
                    value={newOption.optionValue}
                    onChange={(e) => setNewOption({ ...newOption, optionValue: e.target.value })}
                    placeholder="New Option Value"
                />
                <input
                    type="text"
                    value={newOption.displayText}
                    onChange={(e) => setNewOption({ ...newOption, displayText: e.target.value })}
                    placeholder="New Display Text"
                />
                <button onClick={handleAddOption}>Add Option</button>
            </div>
        </div>
    );
};

export default EditOptions;