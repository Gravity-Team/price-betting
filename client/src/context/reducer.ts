import { Reducer } from 'react';
import { StateType } from '../types/types';
import { AppAction, AppActionTypes } from './actions';
import { sub } from '../utils/subDec';

const reducer: Reducer<StateType, AppAction> = (state, action) => {
    if (action.type === AppActionTypes.DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'failure',
            alertText: action.payload.text,
        };
    }

    if (action.type === AppActionTypes.CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: null,
            alertText: '',
        };
    }

    if (action.type === AppActionTypes.HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value };
    }

    if (action.type === AppActionTypes.CLEAR_VALUES) {
        return {
            ...state,
            name: '',
            email: '',
            price: 0.01,
        };
    }

    if (action.type === AppActionTypes.CREATE_BET_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === AppActionTypes.CREATE_BET_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Bet Placed!',
        };
    }

    if (action.type === AppActionTypes.CREATE_BET_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'failure',
            alertText: action.payload.alertText,
        };
    }

    if (action.type === AppActionTypes.GET_BET_BEGIN) {
        return { ...state, isLoading: true };
    }

    if (action.type === AppActionTypes.GET_BET_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            bets: action.payload.bets,
        };
    }

    if (action.type === AppActionTypes.GET_BET_ERROR) {
        return {
            ...state,
            isLoading: false,
        };
    }

    if (action.type === AppActionTypes.UPDATE_CURRENT_PRICE) {
        const price = action.payload.price;
        const sortedBets = state.bets
            .map((bet) => ({
                ...bet,
                diff: Math.abs(price-Number(bet.price)),
            }))
            .sort((a, b) => a.diff - b.diff);
        return {
            ...state,
            bets: sortedBets,
            currentPrice: price,
        };
    }

    return state;
};

export { reducer };
