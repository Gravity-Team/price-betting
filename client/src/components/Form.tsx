import { FC } from 'react';
import { Input } from './Input';
import { Button } from './Button';

type FormProps = {};

const Form: FC<FormProps> = () => {
    return (
        <div>
            <Input type="text" name="Name" value="" handleChange={() => {}} required={true} />
            <Input type="email" name="E-mail" value="" handleChange={() => {}} required={true} />
            <Input type="number" name="Price" value="" handleChange={() => {}} required={true} />
            <Button text="Bet" />
        </div>
    );
};

export { Form };
