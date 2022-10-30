import {autorun, makeAutoObservable, reaction, toJS, when} from "mobx";
import {TDataStore, TRuleReactTypesValuesStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {ApiRuleReactTypesValues} from "@api/RuleReactTypesValues";

const ruleReactTypeValuesStore : TRuleReactTypesValuesStore = makeAutoObservable({
  store : initialStoreState,
  inactiveValues : [],
  storeName : StoresNames.RuleReactTypeValuesStore,
  localStorageName : LocalStorageNames.RuleReactTypeValuesStore,
  api : ApiRuleReactTypesValues.Models.getRuleReactTypeValues,
  fetchApiData : async () => {
    await fetchStoreApi(
      ruleReactTypeValuesStore.store,
      ruleReactTypeValuesStore.localStorageName,
      ruleReactTypeValuesStore.api,
      true,
      false
    )
  },
  getValuesByRuleReactTypeId(ruleReactTypeId, sla_flg) {
    return  ruleReactTypeValuesStore.store.data.filter(e => e.rule_react_type.id === ruleReactTypeId && e.sla_flg === sla_flg)
  },
  getCurrentStoreData() {
    return ruleReactTypeValuesStore.store.data;
  },
  getCurrentStoreState() {
    return ruleReactTypeValuesStore.store.state;
  },
  getStoreName() {
    return ruleReactTypeValuesStore.storeName
  },
  getStoreError() {
    return ruleReactTypeValuesStore.store.error
  },
  setApiUpdateLoop(time = 10000) {
    const updateLoop = setInterval(() => {
      ruleReactTypeValuesStore.fetchApiData();
    }, time);
    return () => clearInterval(updateLoop);
  },
  forceUpdateStore() {
    ruleReactTypeValuesStore.fetchApiData()
  },
})

reaction(
  () => ruleReactTypeValuesStore.store.data.length > 0,
  () => {
    let tempArr : any[] = []

    ruleReactTypeValuesStore.store.data?.map((elem : any) => {
      if (elem.active_flg === false) {
        ruleReactTypeValuesStore.inactiveValues.push(toJS(elem))
      } else {
        tempArr.push(toJS(elem))
      }
    })

    ruleReactTypeValuesStore.store.data = tempArr
  }
);


export default ruleReactTypeValuesStore