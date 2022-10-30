import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable, toJS} from "mobx";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {TDataStore} from "@store/RootStore/utils/types";
import {ApiSubjects} from "@api/Subjects";


const subjectsStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.SubjectsStore,
    localStorageName : LocalStorageNames.SubjectsStore,
    api : ApiSubjects.Models.getSubjects,
    fetchApiData : () => {
        fetchStoreApi(
            subjectsStore.store,
            subjectsStore.localStorageName,
            subjectsStore.api,
          true)},
    getCurrentStoreData() {
        return subjectsStore.store.data;
    },
    getCurrentStoreState() {
        return subjectsStore.store.state;
    },
    getStoreName() {
        return subjectsStore.storeName
    },
    getStoreDataAsObject() {
      let tempObject = {}
        subjectsStore.store?.data?.map(subject => {
            tempObject[subject.id] = subject
        })
      return toJS(tempObject)
    },
    getStoreError() {
        return subjectsStore.store.error
    },
    setApiUpdateLoop(time = 10000) {
        const updateLoop = setInterval(() => {
            subjectsStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    forceUpdateStore() {
        subjectsStore.fetchApiData()
    }
})

export default subjectsStore