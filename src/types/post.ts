export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type StringFilter = keyof {[P in keyof IPost as IPost[P] extends string? P : never]: IPost[P]}

export const isStringFilter = (value:string): value is StringFilter => {
    return ['title', 'body'].includes(value);
}

export interface IPostFilter {
    searching: string;
    page: number;
    sorting: StringFilter | '';
}

export type SortingOption = {
    name: string;
    value: StringFilter;
}

export type NewPost = Omit<IPost, 'userId'|'id'>