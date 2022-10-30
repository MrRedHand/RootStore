import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable} from "mobx";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {TDataStore} from "@store/RootStore/utils/types";
import {ApiSubjectTypes} from "@api/SubjectTypes";


const subjectsTypesStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.SubjectsTypesStore,
    localStorageName : LocalStorageNames.SubjectsTypesStore,
    api : ApiSubjectTypes.Models.getSubjectTypes,
    fetchApiData : () => {
        fetchStoreApi(
            subjectsTypesStore.store,
            subjectsTypesStore.localStorageName,
            subjectsTypesStore.api,
          true)},
    getCurrentStoreData() {
        return subjectsTypesStore.store.data;
    },
    getCurrentStoreState() {
        return subjectsTypesStore.store.state;
    },
    getStoreName() {
        return subjectsTypesStore.storeName
    },
    getStoreError() {
        return subjectsTypesStore.store.error
    },
    setApiUpdateLoop(time = 10000) {
        const updateLoop = setInterval(() => {
            subjectsTypesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    forceUpdateStore() {
        subjectsTypesStore.fetchApiData()
    }
})

export default subjectsTypesStore
