import { FC } from 'react';
import { Alert } from 'flowbite-react';
import { useAppContext } from '../context/appContext';

type AlertProps = {};

const AlertComponent: FC<AlertProps> = () => {
    const { alertType, alertText } = useAppContext();
    return (
        <Alert color={alertType || 'info'} rounded={false}>
            <span className="rounded-lg">
                <span className="font-medium">{alertText}</span>
            </span>
        </Alert>
    );
};

export { AlertComponent };
