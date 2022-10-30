import { useContext } from 'react';
import {RootStore} from '@store/RootStore/RootStore';
import {StoreContext} from "@store/RootStore/StoreProvider";

export const useNewStores = (): RootStore => useContext(StoreContext);