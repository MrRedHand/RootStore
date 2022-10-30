import {makeAutoObservable} from "mobx";
import {TDataStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {ApiRulePathBehaviors} from "@api/RulePathBehaviors";

const rulePathBehaviorsStore : TDataStore = makeAutoObservable({
  store : initialStoreState,
  storeName : StoresNames.RulePathBehaviorsStore,
  localStorageName : LocalStorageNames.RulePathBehaviorsStore,
  api : ApiRulePathBehaviors.Models.getRulePathBehaviors,
  fetchApiData : () => {
    fetchStoreApi(
      rulePathBehaviorsStore.store,
      rulePathBehaviorsStore.localStorageName,
      rulePathBehaviorsStore.api,
      true,
      false
    )
  },
  getCurrentStoreData() {
    return rulePathBehaviorsStore.store.data;
  },
  getCurrentStoreState() {
    return rulePathBehaviorsStore.store.state;
  },
  getStoreName() {
    return rulePathBehaviorsStore.storeName
  },
  getStoreError() {
    return rulePathBehaviorsStore.store.error
  },
  setApiUpdateLoop(time = 10000) {
    const updateLoop = setInterval(() => {
      rulePathBehaviorsStore.fetchApiData();
    }, time);
    return () => clearInterval(updateLoop);
  },
  forceUpdateStore() {
    rulePathBehaviorsStore.fetchApiData()
  }
})

export default rulePathBehaviorsStore