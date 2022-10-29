import { Table } from 'flowbite-react';
import { FC, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { TableRow } from './TableRow';

type LeaderboardProps = {};

const Leaderboard: FC<LeaderboardProps> = () => {
    const { isLoading, bets, getAllBets } = useAppContext();

    useEffect(() => {
        getAllBets().then();
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
                    {bets.map((bet) => (
                        <TableRow key={bet._id} bet={bet} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export { Leaderboard };