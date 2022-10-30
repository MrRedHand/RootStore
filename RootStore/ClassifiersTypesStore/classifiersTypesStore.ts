import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable, toJS} from "mobx";
import {ApiClassifierTypes} from "@api/ClassifierType";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {TDataStore} from "@store/RootStore/utils/types";


const classifiersTypesStore : TDataStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.ClassifiersTypesStore,
    localStorageName : LocalStorageNames.ClassifiersTypesStore,
    api : ApiClassifierTypes.Models.getClassifierTypes,
    setApiUpdateLoop : (time= 10000) => {
        const updateLoop = setInterval(() => {
            classifiersTypesStore.fetchApiData();

        }, time);
        return () => clearInterval(updateLoop);
    },
    fetchApiData : () => {
        fetchStoreApi(
            classifiersTypesStore.store,
            classifiersTypesStore.localStorageName,
            classifiersTypesStore.api,
          true)},

    getCurrentStoreData : () => {
        return classifiersTypesStore.store.data;
    },
    getCurrentStoreState : () => {
        return classifiersTypesStore.store.state;
    },
    getStoreName : () => {
        return classifiersTypesStore.storeName
    },
    getStoreError : () => {
        return classifiersTypesStore.store.error
    },
    getStoreDataAsObject() {
        let tempObject = {}
        classifiersTypesStore.store?.data?.map(subject => {
            tempObject[subject.id] = toJS(subject)
        })
        return toJS(tempObject)
    },
    getStoreItemById(id) {
        return toJS(classifiersTypesStore.store.data.filter(e => e.id === id))
    },
    forceUpdateStore() {
        classifiersTypesStore.fetchApiData()
    }

})

export default classifiersTypesStore