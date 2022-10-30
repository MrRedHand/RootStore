import {autorun, makeAutoObservable, toJS} from "mobx";
import {TStatusesStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {ApiMetricTypes} from "@api/MetricTypes";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import ColorsModelApi from "@services/spa/Colors";
import accountStore from "@store/RootStore/AccountStore/accountStore";
import statusesTypesStore from "@store/RootStore/StatusesStore/StatusesTypesStore/statusesTypesStore";
import currentStatusesStore from "@store/RootStore/StatusesStore/CurrentStatusesStore/currentStatusesStore";


export const statusesStore : TStatusesStore = makeAutoObservable({
    storeName : StoresNames.StatusesStore,
    subStores : {
        "statusesTypesStore" : statusesTypesStore,
        "statusesColorsStore" : currentStatusesStore
    },
    getStoreName() {
        return statusesStore.storeName
    },
    // statusesTypesStore : initialStoreState,
    // currentStatusesStore : initialStoreState,
    // storeName : StoresNames.StatusesStore,
    // localStorageName : LocalStorageNames.StatusesStore,
    // apiStatusesTypes : ColorsModelApi.getColors,
    // apiStatusesColors : ColorsModelApi.getColors,
    // fetchApiData : () => {
    //     console.log("запрошен апи для ", statusesStore.storeName)
    //     fetchStoreApi(
    //         statusesStore.statusesTypesStore,
    //         statusesStore.localStorageName,
    //         statusesStore.apiStatusesTypes
    //     )
    //     fetchStoreApi(
    //         statusesStore.currentStatusesStore,
    //         statusesStore.localStorageName,
    //         statusesStore.apiStatusesColors
    //     )
    // },
    // setApiUpdateLoop(time = 10000) {
    //     const updateLoop = setInterval(() => {
    //         statusesStore.fetchApiData();
    //     }, time);
    //     return () => clearInterval(updateLoop);
    // },
    // getCurrentStoreData(type) {
    //     switch (type) {
    //         case "StatusesColors":
    //             return toJS(statusesStore.currentStatusesStore.data);
    //         case "StatusesTypes":
    //             return toJS(statusesStore.statusesTypesStore.data);
    //     }
    // },
    // getCurrentStoreState(type) {
    //     switch (type) {
    //         case "StatusesColors":
    //             return statusesStore.currentStatusesStore.state;
    //         case "StatusesTypes":
    //             return statusesStore.statusesTypesStore.state;
    //     }
    // },
    // getStoreName() {
    //     return statusesStore.storeName
    // },
    // getStoreError(type) {
    //     switch (type) {
    //         case "StatusesColors":
    //             return statusesStore.currentStatusesStore.error;
    //         case "StatusesTypes":
    //             return statusesStore.statusesTypesStore.error;
    //     }
    // },
    // getAllColors () {
    //
    // },
    // getServiceCriteriaStatuses () {
    //
    // },
    // getServiceCriteriaMetricStatuses () {
    //
    // },
    // getServicesStatuses () {
    //
    // },
    // getSubjectsStatuses () {
    //
    // },
    // getMnemoStatusColor (mnemo) {
    //
    // },
})


export default statusesStore