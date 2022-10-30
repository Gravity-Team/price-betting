import { Table } from 'flowbite-react';
import { FC, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { TableRow } from './TableRow';
import { throttle } from '../utils/throttle';

type LeaderboardProps = {};

const Leaderboard: FC<LeaderboardProps> = () => {
    const { isLoading, bets, getAllBets, updateCurrentPrice } = useAppContext();

    useEffect(() => {
        getAllBets().then();
        const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
        ws.onmessage = throttle((event: any) => {
            const json = JSON.parse(event.data);
            const price = parseFloat(json.p).toFixed(2);
            console.log('price', price);
            updateCurrentPrice(price);
        }, 2000);

        return () => ws.close();
    }, []);

    return (
        <div className="max-h-[500px] overflow-y-auto">
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Time</Table.HeadCell>
                    <Table.HeadCell>Bet</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {bets.map((bet, index) => (
                        <TableRow key={bet._id} bet={bet} index={index} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export { Leaderboard };
