import { Store } from '@reduxjs/toolkit';
import { Persistor } from 'redux-persist';

declare const store: Store;
declare const persistor: Persistor;

export { store, persistor };