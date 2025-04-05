// userSlice.d.ts

import { AnyAction } from 'redux';

export interface UserState {
  currentUser: any;
  error: string | null;
  loading: boolean;
}

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

export const userReducer: (state: UserState | undefined, action: AnyAction) => UserState;

