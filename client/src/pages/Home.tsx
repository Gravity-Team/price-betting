import { FC } from 'react';
import { Form } from '../components/Form';
import { Chart } from '../components/Chart';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
    return (
        <div className="container mx-auto pt-24">
            <h1 className="text-center text-4xl mb-4">
                Crypto Betting <br />
                Win 0.1 ETH Every Day
            </h1>

            <div className="grid xl:grid-cols-[1fr_2fr_1fr] gap-4 grid-cols-1">
                <Form />
                <Chart />
            </div>
            <h1 className="text-center text-4xl mt-8">
                Guess ETH / USDT price at 15:00
                <br />
                Place bets until 12:00
            </h1>
        </div>
    );
};

export { Home };
