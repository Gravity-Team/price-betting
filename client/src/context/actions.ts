export enum AppActionTypes {
    DISPLAY_ALERT = 'SHOW_ALERT',
    CLEAR_ALERT = 'CLEAR_ALERT',
    HANDLE_CHANGE = 'HANDLE_CHANGE',
    CLEAR_VALUES = 'CLEAR_VALUES',
    CREATE_BET_BEGIN = 'CREATE_BET_BEGIN',
    CREATE_BET_SUCCESS = 'CREATE_BET_SUCCESS',
    CREATE_BET_ERROR = 'CREATE_BET_ERROR',
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
    | { type: AppActionTypes.CREATE_BET_ERROR; payload: AlertPayload };
