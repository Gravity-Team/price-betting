import { createContext, FC, ReactNode, useContext, useReducer } from 'react';
import { StateType, Winners } from '../types/types';
import { reducer } from './reducer';
import { AppActionTypes } from './actions';
import axios, { AxiosError } from 'axios';

const URL = import.meta.env.PROD
    ? 'https://junction.gravityteam.co/api'
    : 'http://localhost:9000/api';

const initialState: StateType = {
    currentPrice: '0.00',
    name: '',
    email: '',
    price: 1000.01,
    bets: [],
    handleChange: function () {},
    clearValues: function () {},
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: null,
    displayAlert: function () {},
    createBet: async function () {},
    getAllBets: async function () {},
    updateCurrentPrice: function () {},
    leaderboardState: Winners.CURRENT_BETS,
    changeLeaderBoardState: function () {},
    updateLeaderBoardPositions: function () {},
};

const AppContext = createContext<StateType>(initialState);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const api = axios.create({
        baseURL: URL,
    });

    const updateCurrentPrice = (price: string) => {
        dispatch({ type: AppActionTypes.UPDATE_CURRENT_PRICE, payload: { price } });
        updateLeaderBoardPositions();
    };

    const displayAlert = (text: string) => {
        dispatch({ type: AppActionTypes.DISPLAY_ALERT, payload: { text } });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: AppActionTypes.CLEAR_ALERT,
            });
        }, 5000);
    };

    const handleChange = (name: string, value: string | number) => {
        dispatch({ type: AppActionTypes.HANDLE_CHANGE, payload: { name, value } });
    };

    const clearValues = () => {
        dispatch({ type: AppActionTypes.CLEAR_VALUES });
    };

    const createBet = async () => {
        dispatch({ type: AppActionTypes.CREATE_BET_BEGIN });
        try {
            const { name, email, price } = state;
            await api.post('/bets', { name, email, price });
            dispatch({ type: AppActionTypes.CREATE_BET_SUCCESS });
            clearValues();
            await getAllBets();
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({
                        type: AppActionTypes.CREATE_BET_ERROR,
                        payload: { alertText: err.response?.data.msg },
                    });
                }
            }
        }
        clearAlert();
    };

    const getAllBets = async () => {
        dispatch({ type: AppActionTypes.GET_BET_BEGIN });
        try {
            const config = { params: { winners: 'last' } };
            const { data } = await api.get(
                '/bets',
                state.leaderboardState === Winners.LAST_WINNERS ? config : {}
            );
            dispatch({ type: AppActionTypes.GET_BET_SUCCESS, payload: { bets: data } });
            updateLeaderBoardPositions();
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status !== 401) {
                    dispatch({
                        type: AppActionTypes.GET_BET_ERROR,
                    });
                }
            }
        }
    };

    const updateLeaderBoardState = () => {
        dispatch({ type: AppActionTypes.UPDATE_LEADERBOARD_STATE });
    };

    const updateLeaderBoardPositions = () => {
        dispatch({ type: AppActionTypes.UPDATE_LEADERBOARD_POSITIONS });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                handleChange,
                clearValues,
                createBet,
                getAllBets,
                updateCurrentPrice,
                changeLeaderBoardState: updateLeaderBoardState,
                updateLeaderBoardPositions,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
