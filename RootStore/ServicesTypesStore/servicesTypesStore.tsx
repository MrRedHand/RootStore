import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable, toJS} from "mobx";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {TDataStore} from "@store/RootStore/utils/types";
import {ApiServiceTypes} from "@api/ServiceTypes";


const servicesTypesStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.ServicesTypesStore,
    localStorageName : LocalStorageNames.ServicesTypesStore,
    api : ApiServiceTypes.Models.getServiceTypes,
    fetchApiData : () => {
        fetchStoreApi(
            servicesTypesStore.store,
            servicesTypesStore.localStorageName,
            servicesTypesStore.api,
          true)},
    getCurrentStoreData() {
        return servicesTypesStore.store.data;
    },
    getCurrentStoreState() {
        return servicesTypesStore.store.state;
    },
    getStoreItemById(id) {
        return toJS(servicesTypesStore.store.data.filter(e => e.id === id))
    },
    getStoreName() {
        return servicesTypesStore.storeName
    },
    getStoreError() {
        return servicesTypesStore.store.error
    },
    setApiUpdateLoop(time = 10000) {
        const updateLoop = setInterval(() => {
            servicesTypesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    forceUpdateStore() {
        servicesTypesStore.fetchApiData()
    }
})

export default servicesTypesStore