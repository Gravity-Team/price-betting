import { Bet } from '../types/types';

export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    HANDLE_CHANGE = 'HANDLE_CHANGE',
    CLEAR_VALUES = 'CLEAR_VALUES',
    CREATE_BET_BEGIN = 'CREATE_BET_BEGIN',
    CREATE_BET_SUCCESS = 'CREATE_BET_SUCCESS',
    CREATE_BET_ERROR = 'CREATE_BET_ERROR',
    GET_BET_BEGIN = 'GET_BET_BEGIN',
    GET_BET_SUCCESS = 'GET_BET_SUCCESS',
    GET_BET_ERROR = 'GET_BET_ERROR',
    UPDATE_CURRENT_PRICE = 'UPDATE_CURRENT_PRICE',
    UPDATE_LEADERBOARD_STATE = 'UPDATE_LEADERBOARD_STATE',
    UPDATE_LEADERBOARD_POSITIONS = 'UPDATE_LEADERBOARD_POSITIONS',
}

type AlertPayload = {
    alertText: string;
};

export type AppAction =
    | { type: AppActionTypes.DISPLAY_ALERT; payload: { text: string } }
    | { type: AppActionTypes.CLEAR_ALERT }
    | { type: AppActionTypes.HANDLE_CHANGE; payload: { name: string; value: string | number } }
    | { type: AppActionTypes.CLEAR_VALUES }
    | { type: AppActionTypes.CREATE_BET_BEGIN }
    | { type: AppActionTypes.CREATE_BET_SUCCESS }
    | { type: AppActionTypes.CREATE_BET_ERROR; payload: AlertPayload }
    | { type: AppActionTypes.GET_BET_BEGIN }
    | { type: AppActionTypes.GET_BET_SUCCESS; payload: { bets: Bet[] } }
    | { type: AppActionTypes.GET_BET_ERROR }
    | { type: AppActionTypes.UPDATE_CURRENT_PRICE; payload: { price: string } }
    | { type: AppActionTypes.UPDATE_LEADERBOARD_STATE }
    | { type: AppActionTypes.UPDATE_LEADERBOARD_POSITIONS };
