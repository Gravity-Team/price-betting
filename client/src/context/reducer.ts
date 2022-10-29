import { Reducer } from 'react';
import { StateType } from '../types/types';
import { AppAction, AppActionTypes } from './actions';

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

    return state;
};

export { reducer };
