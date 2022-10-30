import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import {makeAutoObservable, reaction, toJS} from "mobx";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {TClassifiersValuesStore} from "@store/RootStore/utils/types";
import {ApiClassifierValues} from "@api/ClassifierValue";


const classifiersValuesStore : TClassifiersValuesStore = makeAutoObservable({
  store : initialStoreState,
  storeName : StoresNames.ClassifiersValuesStore,
  localStorageName : LocalStorageNames.ClassifiersValuesStore,
  api : ApiClassifierValues.Models.getClassifierValues,
  fetchApiData : () => {
    fetchStoreApi(
        classifiersValuesStore.store,
        classifiersValuesStore.localStorageName,
        classifiersValuesStore.api,
      true,
      false)},
  getCurrentStoreData() {
    return classifiersValuesStore.store.data;
  },
  getCurrentStoreState() {
    return classifiersValuesStore.store.state;
  },
  getStoreName() {
    return classifiersValuesStore.storeName
  },
  getStoreError() {
    return classifiersValuesStore.store.error
  },
  getClassifiersValuesByTypeId(id, asObject= false) {
      let tempArray : any[] = []
      let tempObject = {}

    Object.entries(classifiersValuesStore.store.data).map(([key , value] : any) => {
      if (value.classifier_type_id === id) {

        if (asObject) {
          tempObject[value.id] = toJS(value)
        } else {
          tempArray.push(toJS(value))
        }
      }
    })

    if (asObject) {
      return tempObject
    } else {
      return tempArray
    }
  },
  setApiUpdateLoop(time = 10000) {
    const updateLoop = setInterval(() => {
      classifiersValuesStore.fetchApiData();
    }, time);
    return () => clearInterval(updateLoop);
  },
  forceUpdateStore() {
    classifiersValuesStore.fetchApiData()
  },
  getStoreItemById(id) {
      return toJS(classifiersValuesStore.store.data.filter(e => e.id === id))
  },
  getStoreDataAsObject() {

    let tempObj = {}

    classifiersValuesStore.store.data.map(elem => {
      tempObj[elem.id] = toJS(elem)
    })

    return tempObj
  }
})

export default classifiersValuesStore
