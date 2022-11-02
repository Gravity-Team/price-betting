import { FC } from 'react';
import { Form } from '../components/Form';
import { Chart } from '../components/Chart';
import { Leaderboard } from '../components/Leaderboard';
import logo from '../assets/images/logo-light.png';

type HomeProps = {};

const Home: FC<HomeProps> = () => {
    return (
        <div className="container mx-auto pt-16">
            <div className="flex justify-center mb-8">
                <img src={logo} alt="Gravity Team Logo" />
            </div>
            <h1 className="text-center text-4xl mb-4">
                Crypto Betting <br />
                Win 0.1 ETH Every Day
            </h1>

            <div className="grid xl:grid-cols-[1fr_2fr_1fr] gap-4 grid-cols-1">
                <Form />
                <Chart />
                <Leaderboard />
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
