import { createStore } from "redux";
import { IState, DeleteActionType, DeleteActionEnum } from "./types";

const defaultState: IState = {
    deleteCount: 0,
};

function reducer(state = defaultState, action: DeleteActionType) {
    switch (action.type) {
        case DeleteActionEnum.ADD_DELETE:
            return { ...state, deleteCount: action.payload };
        default:
            return state;
    }
}

export const store = createStore(reducer);
export type RootState = ReturnType<typeof store.getState>;
export const addDeleteAction = (payload: number) => ({ type: DeleteActionEnum.ADD_DELETE, payload });
