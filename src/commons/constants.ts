export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};

export const saltPasword = 10

export enum FriendshipStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REFUSED = 'REFUSED',
    BLOCKED = 'BLOCKED'
}