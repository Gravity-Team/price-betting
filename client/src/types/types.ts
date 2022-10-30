export type StateType = {
    currentPrice: string;
    isLoading: boolean;
    showAlert: boolean;
    alertText: string;
    alertType: 'failure' | 'gray' | 'info' | 'success' | 'warning' | null;
    displayAlert: (text: string) => void;
    name: string;
    email: string;
    price: number;
    bets: Bet[];
    handleChange: (name: string, value: string) => void;
    clearValues: () => void;
    createBet: () => Promise<void>;
    getAllBets: () => Promise<void>;
    updateCurrentPrice: (price: string) => void;
};

export type Bet = {
    _id: string;
    name: string;
    email: string;
    price: string;
    createdAt: string;
    updatedAt: string;
    diff?: number;
};
