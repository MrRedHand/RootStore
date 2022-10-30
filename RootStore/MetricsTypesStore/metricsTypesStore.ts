import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable} from "mobx";
import {TMetricTypesStore} from "@store/RootStore/utils/types";
import {ApiMetricTypes} from "@api/MetricTypes";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";


const metricsTypesStore : TMetricTypesStore = makeAutoObservable({
    store : initialStoreState,
    storeName : StoresNames.MetricTypesStore,
    localStorageName : LocalStorageNames.MetricTypesStore,
    api : ApiMetricTypes.Models.getMetricTypes,
    fetchApiData : () => {
        fetchStoreApi(
            metricsTypesStore.store,
            metricsTypesStore.localStorageName,
            metricsTypesStore.api,
          true
        )
    },
    getCurrentStoreData() {
        return metricsTypesStore.store.data;
    },
    getCurrentStoreState() {
        return metricsTypesStore.store.state;
    },
    getStoreName() {
        return metricsTypesStore.storeName
    },
    getStoreError() {
        return metricsTypesStore.store.error
    },
    getMetricTypeById(id) {
        return metricsTypesStore.store.data?.find((metricType) => metricType.id == id) ?? {};
    },
    setApiUpdateLoop(time = 10000) {
        const updateLoop = setInterval(() => {
            metricsTypesStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    forceUpdateStore() {
        metricsTypesStore.fetchApiData()
    }
})


export default metricsTypesStore
