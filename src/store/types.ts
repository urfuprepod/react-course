export enum DeleteActionEnum {
    ADD_DELETE = 'ADD_DELETE'
}

export interface IState {
    deleteCount: number;
}

interface IDeleteState {
    type: DeleteActionEnum.ADD_DELETE,
    payload: number;
}

export type DeleteActionType = IDeleteState;