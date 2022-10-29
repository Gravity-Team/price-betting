import { FC } from 'react';
import { Bet } from '../types/types';
import { Table } from 'flowbite-react';
import { dateFormat } from '../utils/dateFormat';

type TableRowProps = { bet: Bet };

const TableRow: FC<TableRowProps> = ({ bet }) => {
    const { name, _id, price, updatedAt, email, createdAt } = bet;
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{dateFormat(new Date(createdAt))}</Table.Cell>
            <Table.Cell>{price}</Table.Cell>
        </Table.Row>
    );
};

export { TableRow };
