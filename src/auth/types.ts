type UserViewModel = {
    id: number,
    email: string,
    name: string,
    surname: string,
    role: 'ADMIN' | 'USER'
};

export type AuthBody = {
    email: string,
    password: string,
};

export type AuthBodyPartial = Partial<AuthBody>;

export type AuthSuccessResponse = {
    token: string,
    user: UserViewModel,
};
