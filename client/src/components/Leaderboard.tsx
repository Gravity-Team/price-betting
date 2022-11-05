import { Button, Table } from 'flowbite-react';
import { FC, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { TableRow } from './TableRow';
import { throttle } from '../utils/throttle';
import axios from 'axios';
import { Winners } from '../types/types';

type LeaderboardProps = {};

const Leaderboard: FC<LeaderboardProps> = () => {
    const {
        isLoading,
        bets,
        getAllBets,
        updateCurrentPrice,
        leaderboardState,
        changeLeaderBoardState,
        currentPrice,
    } = useAppContext();

    useEffect(() => {
        getAllBets().then();

        const hoursLimit = 15;

        const getCurrentPriceFromBinance = async (hoursLimit: number, dayOffsetInMs = 0) => {
            const startTime = new Date().setHours(hoursLimit - 1, 0, 0, 0) - dayOffsetInMs;
            const endTime = new Date().setHours(hoursLimit, 0, 0, 10) - dayOffsetInMs;
            const { data } = await axios.get('https://api.binance.com/api/v3/klines', {
                params: {
                    symbol: 'ETHUSDT',
                    interval: '1h',
                    startTime,
                    // endTime,
                    limit: 1,
                },
            });
            return data;
        };

        const ws = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
        if (leaderboardState === Winners.LAST_WINNERS) {
            ws.close();
            const dayInMs = 24 * 60 * 60 * 1000;
            getCurrentPriceFromBinance(hoursLimit, dayInMs).then((data) => {
                updateCurrentPrice(data[0][4]);
                // updateLeaderBoardPositions();
            });
        }
        if (leaderboardState === Winners.CURRENT_BETS) {
            ws.onmessage = throttle(async (event: any) => {
                const json = JSON.parse(event.data);
                const price = parseFloat(json.p);
                // const time = new Date().getHours();
                // if (time >= hoursLimit) {
                //     ws.close();
                //     const binancePrice = await getCurrentPriceFromBinance(hoursLimit);
                //     updateCurrentPrice(binancePrice[0][4]);
                //     // updateLeaderBoardPositions();
                //     return;
                // }
                updateCurrentPrice(price);
                // updateLeaderBoardPositions();
            }, 2000);
        }

        return () => ws.close();
    }, [leaderboardState]);

    return (
        <div>
            <Button.Group className="mb-4 grid grid-cols-2">
                <Button
                    className="disabled:bg-violet disabled:opacity-100 disabled:text-white disabled:hover:text-black"
                    color="gray"
                    onClick={changeLeaderBoardState}
                    disabled={leaderboardState === Winners.LAST_WINNERS}
                >
                    Last Winners
                </Button>
                <Button
                    className="disabled:bg-violet disabled:opacity-100 disabled:text-white disabled:hover:text-black"
                    color="gray"
                    onClick={changeLeaderBoardState}
                    disabled={leaderboardState === Winners.CURRENT_BETS}
                >
                    Current Bets
                </Button>
            </Button.Group>
            <div className="max-h-[440px] overflow-y-auto">
                <Table hoverable={true}>
                    <Table.Head className="bg-violet">
                        <Table.HeadCell colSpan={12} className="text-center text-lg text-white">
                            {currentPrice}
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Time</Table.HeadCell>
                        <Table.HeadCell>Bet</Table.HeadCell>
                    </Table.Head>
                    {/*<div>{currentPrice}</div>*/}
                    <Table.Body className="divide-y">
                        {bets.map((bet, index) => (
                            <TableRow key={bet._id} bet={bet} index={index} />
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export { Leaderboard };
