import {makeAutoObservable, toJS} from "mobx";
import {TDataStore, TDataStoreState} from "@store/RootStore/utils/types";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import ColorsModelApi from "@services/spa/Colors";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";

const statusesTypesStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.StatusesTypesStore,
    localStorageName : LocalStorageNames.StatusesTypesStore,
    api : ColorsModelApi.getColors,
    setApiUpdateLoop : (time = 10000) => {
        const updateLoop = setInterval(() => {
            statusesTypesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    fetchApiData : () => {
        fetchStoreApi(
            statusesTypesStore.store,
            statusesTypesStore.localStorageName,
            statusesTypesStore.api,
          true)},

    getStoreDataAsObject() {
        let tempObject = {}
        statusesTypesStore.store?.data?.map(subject => {
            tempObject[subject.id] = toJS(subject)
        })
        return toJS(tempObject)
    },
    getCurrentStoreData : () => {
        return statusesTypesStore.store.data;
    },
    getCurrentStoreState : () => {
        return statusesTypesStore.store.state;
    },
    getStoreName : () => {
        return statusesTypesStore.storeName
    },
    getStoreError : () => {
        return statusesTypesStore.store.error
    },
    forceUpdateStore : () => {
        statusesTypesStore.fetchApiData();
    }
})

export default statusesTypesStore