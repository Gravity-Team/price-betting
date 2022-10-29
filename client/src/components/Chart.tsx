import { FC } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

type ChartProps = {};

const Chart: FC<ChartProps> = () => {
    return (
        <div className="min-h-[500px]">
            <AdvancedRealTimeChart
                autosize={true}
                symbol="BINANCE:ETHUSD"
                interval="D"
                timezone="Etc/UTC"
                theme="dark"
                style="1"
                locale="en"
                toolbar_bg="#f1f3f6"
                enable_publishing={false}
                allow_symbol_change={true}
                container_id="tradingview_54869"
            />
        </div>
    );
};

export { Chart };
