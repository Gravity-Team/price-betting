import { createContext, FC, ReactNode, useContext, useReducer } from 'react';
import { StateType } from '../types/types';
import { reducer } from './reducer';
import { AppActionTypes } from './actions';
import axios, { AxiosError } from 'axios';

const URL = import.meta.env.PROD ? '' : 'http://localhost:9000/api';

const initialState: StateType = {
    name: '',
    email: '',
    price: 0.01,
    handleChange: function () {},
    clearValues: function () {},
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: null,
    displayAlert: function () {},
    createBet: async function () {},
};

const AppContext = createContext<StateType>(initialState);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const api = axios.create({
        baseURL: URL,
    });

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

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                handleChange,
                clearValues,
                createBet,
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
