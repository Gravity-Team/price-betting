import { FC } from 'react';
import { Bet } from '../types/types';
import { Table } from 'flowbite-react';
import { dateFormat } from '../utils/dateFormat';

type TableRowProps = { bet: Bet; index: number };

const TableRow: FC<TableRowProps> = ({ bet, index }) => {
    const { name, _id, price, updatedAt, email, createdAt } = bet;
    let color = 'bg-white';
    if (index === 0) {
        color = 'bg-gold';
    }
    if (index === 1) {
        color = 'bg-silver';
    }
    if (index === 2) {
        color = 'bg-bronze';
    }
    return (
        <Table.Row className={`${color} dark:border-gray-700 dark:bg-gray-800 text-black`}>
            <Table.Cell className="whitespace-nowrap font-medium dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{dateFormat(new Date(createdAt))}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
        </Table.Row>
    );
};

export { TableRow };
