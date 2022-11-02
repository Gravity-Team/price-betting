import { FC } from 'react';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

type ChartProps = {};

const Chart: FC<ChartProps> = () => {
    return (
        <div className="min-h-[500px]">
            <AdvancedRealTimeChart
                autosize={true}
                symbol="BINANCE:ETHUSD"
                range="5D"
                interval="D"
                timezone="Europe/Helsinki"
                theme="dark"
                style="1"
                locale="en"
                toolbar_bg="#f1f3f6"
                enable_publishing={false}
                allow_symbol_change={false}
                withdateranges={false}
                save_image={false}
                hide_top_toolbar={true}
                hide_side_toolbar={true}
                container_id="tradingview_54869"
            />
        </div>
    );
};

export { Chart };
