import { ChangeEvent, FC } from 'react';

type InputProps = {
    type: string;
    name: string;
    value: string | number;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    labeltText?: string;
};

const Input: FC<InputProps> = ({ type, name, value, handleChange, labeltText }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 text-lg font-medium">
                {labeltText || name}
            </label>
            <input
                step={0.01}
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        </div>
    );
};

export { Input };
