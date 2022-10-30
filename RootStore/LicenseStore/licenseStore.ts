import {makeAutoObservable, toJS} from "mobx";
import {TLicenseStore} from "@store/RootStore/utils/types";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {initialLicenseStoreState, LicenseStoreState} from "@store/RootStore/utils/StoreStates";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {ApiLicense} from "@api/License";

const licenseStore : TLicenseStore = makeAutoObservable({
    store : initialLicenseStoreState,
    storeName : StoresNames.LicenseStore,
    localStorageName : LocalStorageNames.LicenseStore,
    api : ApiLicense.Models.getLicense,
    fetchApiData : () => {
        fetchStoreApi(
            licenseStore.store,
            licenseStore.localStorageName,
            licenseStore.api,
            true,
            false
        )
    },
    setApiUpdateLoop : (time= 10000) => {
        const updateLoop = setInterval(() => {
            licenseStore.fetchApiData();
        }, time);
        return () => clearInterval(updateLoop);
    },
    getStoreName() {
        return licenseStore.storeName
    },
    getCurrentStoreState() {
        return licenseStore.store.state;
    },
    getStoreError() {
        return licenseStore.store.error
    },
    getLicenseInfo() {
        return toJS(licenseStore.store.data)
    },
    forceUpdateStore() {
        licenseStore.fetchApiData()
    }
})

export default licenseStore