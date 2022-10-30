import {makeAutoObservable, toJS} from "mobx";
import {TDataStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import ColorsModelApi from "@services/spa/Colors";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";

const currentStatusesStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.CurrentStatusesStore,
    localStorageName : LocalStorageNames.CurrentStatusesStore,
    api : ColorsModelApi.getColors,
    setApiUpdateLoop : (time= 10000) => {
        const updateLoop = setInterval(() => {
            currentStatusesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    fetchApiData : () => {
        fetchStoreApi(
            currentStatusesStore.store,
            currentStatusesStore.localStorageName,
            currentStatusesStore.api,
          true)},

    getStoreDataAsObject() {
        let tempObject = {}
        currentStatusesStore.store?.data?.map(subject => {
            tempObject[subject.id] = toJS(subject)
        })
        return toJS(tempObject)
    },
    getCurrentStoreData : () => {
        return currentStatusesStore.store.data;
    },
    getCurrentStoreState : () => {
        return currentStatusesStore.store.state;
    },
    getStoreName : () => {
        return currentStatusesStore.storeName
    },
    getStoreError : () => {
        return currentStatusesStore.store.error
    },
    forceUpdateStore : () => {
        currentStatusesStore.fetchApiData();
    }
})
export default currentStatusesStore