import {makeAutoObservable, toJS} from "mobx";
import {TDataStore, TEventsStore} from "@store/RootStore/utils/types";
import {initialStoreState} from "@store/RootStore/utils/StoreStates";
import {LocalStorageNames, StoresNames} from "@store/RootStore/utils/StoresNames";
import GetEvents from "@api/Events/Models/GetEvents";
import {fetchStoreApi} from "@store/RootStore/utils/fetchStoreApi";
import {getEvents} from '@api/ApiOld/Events/getEvents/getEvents';

const eventsStore : TEventsStore  = makeAutoObservable({
  store : initialStoreState,
  storeName : StoresNames.EventsStore,
  localStorageName : LocalStorageNames.EventsStore,
  api : getEvents,
  fetchApiData : () => {
    fetchStoreApi(
      eventsStore.store,
      eventsStore.localStorageName,
      eventsStore.api,
      true,
      true)
  },
  getCurrentStoreData() {
    return toJS(eventsStore.store.data);
  },
  getCurrentStoreState() {
    return toJS(eventsStore.store.state);
  },
  getStoreName() {
    return toJS(eventsStore.storeName)
  },
  getStoreError() {
    return toJS(eventsStore.store.error)
  },
  setApiUpdateLoop(time = 10000) {
    const updateLoop = setInterval(() => {
      eventsStore.fetchApiData();
    }, time);
    return () => clearInterval(updateLoop);
  },
  getStoreDataAsObject() {
    let tempObject = {}
    eventsStore.store?.data?.map(elem => {
      tempObject[elem.id] = toJS(elem)
    })
    return toJS(tempObject)
  },
  getStoreItemById(id) {
    return toJS(eventsStore.store.data.filter(e => e.id === id))
  },
  forceUpdateStore() {
    eventsStore.fetchApiData()
  },
  get getNotEndedEvents() {
    //сделано через мап, а не фильтр, чтобы избежать Proxy

    if (eventsStore.store?.data?.data?.length > 0) {
      let tempArr : any[] = []

      eventsStore.store.data.data.map(e => {
        if (e.end_dt === null) {
          tempArr.push(toJS(e))
        }
      })

      return tempArr
    } else {
      return []
    }

  }
})

export default eventsStore