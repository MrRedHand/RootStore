import {makeAutoObservable} from "mobx";
import {TDataStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {ApiMetricTemplates} from "@api/MetricTemplates";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";

const metricTemplatesStore : TDataStore= makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.MetricTemplatesStore,
    localStorageName : LocalStorageNames.MetricTemplatesStore,
    api : ApiMetricTemplates.Models.getMetricTemplates,
    fetchApiData : () => {
        fetchStoreApi(
            metricTemplatesStore.store,
            metricTemplatesStore.localStorageName,
            metricTemplatesStore.api,
          true)},
    getCurrentStoreData() {
        return metricTemplatesStore.store.data;
    },
    getCurrentStoreState() {
        return metricTemplatesStore.store.state;
    },
    getStoreName() {
        return metricTemplatesStore.storeName
    },
    getStoreError() {
        return metricTemplatesStore.store.error
    },
    setApiUpdateLoop(time = 10000) {
        const updateLoop = setInterval(() => {
            metricTemplatesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    forceUpdateStore() {
        metricTemplatesStore.fetchApiData()
    }
})

export default metricTemplatesStore