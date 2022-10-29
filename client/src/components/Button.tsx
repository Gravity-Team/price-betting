import { FC } from 'react';

type ButtonProps = { text: string };

const Button: FC<ButtonProps> = ({ text }) => {
    return (
        <button
            type="button"
            className="w-full grid text-white bg-gradient-to-br from-violet via-blueLight to-gold hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blueLight dark:focus:ring-blueLight font-medium rounded-sm text-lg uppercase px-5 py-4 text-center mr-2 mt-2 mb-2"
        >
            {text}
        </button>
    );
};

export { Button };
