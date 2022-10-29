import { FC } from 'react';

type ButtonProps = { text: string; type: 'submit' | 'button'; disabled: boolean };

const Button: FC<ButtonProps> = ({ text, type, disabled }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full grid text-white bg-gradient-to-br from-violet via-blueLight to-gold hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blueLight dark:focus:ring-blueLight font-medium rounded-sm text-lg uppercase px-5 py-4 text-center mr-2 mt-2 mb-2 disabled:opacity-50"
        >
            {text}
        </button>
    );
};

export { Button };
