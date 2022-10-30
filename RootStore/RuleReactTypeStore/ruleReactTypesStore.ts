import {makeAutoObservable} from "mobx";
import {TDataStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {ApiRuleReactTypes} from "@api/RuleReactTypes";

const ruleReactTypesStore : TDataStore = makeAutoObservable({
  store : initialStoreState,
  storeName : StoresNames.RuleReactTypesStore,
  localStorageName : LocalStorageNames.RuleReactTypesStore,
  api : ApiRuleReactTypes.Models.getRuleReactType,
  fetchApiData : () => {
    fetchStoreApi(
      ruleReactTypesStore.store,
      ruleReactTypesStore.localStorageName,
      ruleReactTypesStore.api,
      true,
      false
    )
  },
  getCurrentStoreData() {
    return ruleReactTypesStore.store.data;
  },
  getCurrentStoreState() {
    return ruleReactTypesStore.store.state;
  },
  getStoreName() {
    return ruleReactTypesStore.storeName
  },
  getStoreError() {
    return ruleReactTypesStore.store.error
  },
  setApiUpdateLoop(time = 10000) {
    const updateLoop = setInterval(() => {
      ruleReactTypesStore.fetchApiData();
    }, time);
    return () => clearInterval(updateLoop);
  },
  forceUpdateStore() {
    ruleReactTypesStore.fetchApiData()
  }
})

export default ruleReactTypesStore