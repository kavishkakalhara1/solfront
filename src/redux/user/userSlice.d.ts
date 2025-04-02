// filepath: /D:/DevOps/SolveIt-frontend/src/redux/user/userSlice.d.ts declare module '../redux/user/userSlice' { import { AnyAction, ThunkAction } from '@reduxjs/toolkit';

export interface UserState { currentUser: any; error: string | null; loading: boolean; }

export const signInStart: () => AnyAction; 
export const signInSuccess: (user: any) => AnyAction; 
export const signInFailure: (error: string) => AnyAction; 
export const updateStart: () => AnyAction; 
export const updateSuccess: (user: any) => AnyAction; 
export const updateFailure: (error: string) => AnyAction; 
export const deleteUserStart: () => AnyAction; 
export const deleteUserSuccess: () => AnyAction; 
export const deleteUserFailure: (error: string) => AnyAction; 
export const signoutSuccess: () => AnyAction;

const userReducer: (state: UserState | undefined, action: AnyAction) => UserState; 
export default userReducer; 