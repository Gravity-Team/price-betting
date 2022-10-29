import { ChangeEvent, FC, FormEvent } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { useAppContext } from '../context/appContext';
import { AlertComponent } from './AlertComponent';

type FormProps = {};

const Form: FC<FormProps> = () => {
    const {
        name,
        email,
        price,
        showAlert,
        displayAlert,
        handleChange,
        clearValues,
        isLoading,
        createBet,
    } = useAppContext();

    const handleBetInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        handleChange(name, value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !price) {
            displayAlert('Please provide all values!');
            return;
        }

        await createBet();
        console.log({ name, email, price });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {showAlert && <AlertComponent />}
                <Input
                    type="text"
                    name="name"
                    labeltText="Name"
                    value={name}
                    handleChange={handleBetInput}
                />
                <Input
                    type="email"
                    name="email"
                    labeltText="E-mail"
                    value={email}
                    handleChange={handleBetInput}
                />
                <Input
                    type="number"
                    name="price"
                    labeltText="Price"
                    value={price}
                    handleChange={handleBetInput}
                />
                <Button text="Bet" type="submit" disabled={isLoading} />
            </form>
        </div>
    );
};

export { Form };
