import {runInAction, toJS} from 'mobx';
import {DataStoreApiState} from "@store/RootStore/utils/StoreStates";
import {getLocalStorageData, setLocalStorageData} from "@utils/localStorageDataController";
import {TDataStoreState, TLicenseStoreState} from "@store/RootStore/utils/types";
import _ from "lodash"


/**
 *
 * @param storeState Принимает состояние стора, чтобы меня его
 * @param storageName Принимает название стора для local Storage, чтобы хранить
 * @param api Принимает апи функцию для запроса, вида (Апи.Модель.Функция (без выполенения, те без скобок))
 */
export const fetchStoreApi = (
    storeState : TDataStoreState | TLicenseStoreState,
    storageName : string,
    api : any,
    all  = true,
    debug = false,
 ) => {
    //Нужно всегда проверять - а данные уже были загружены?
    //На случай, если другие компоненты зависят от состояния даты стора (LOADING)
    //Если дата уже была и она просто обновляется - REFRESHING
    if (storeState.data.length > 0) {
        runInAction(() => {
            storeState.state = DataStoreApiState.REFRESHING;
        });
    } else {
        runInAction(() => {
            storeState.state = DataStoreApiState.LOADING;
        });
    }

    api(all && {all : true}).then((response) => {
        if(debug) {
            console.log(`STORE DEBUG API [${storageName}]:`, response)
        }
        if (response.success) {

          //Проверяем не пустое ли значение пришло с апи
          if (response.data !== null || undefined || [] || {}) {
            //проверяю пришедшие данные с уже имеющимися - если нет разницы, то не обновляю
            const isEqual = _.isEqual(toJS(storeState.data), response.data)

            if (!isEqual) {
              runInAction(() => {
                if (response.data !== null || undefined || [] || {}) {
                  storeState.data = response.data;
                }
                storeState.state = DataStoreApiState.FINISH;
                if(debug) {
                  console.log(`STORE DEBUG STATE  [${storageName}]:`, toJS(storeState))
                }
                //Так же добавляем данные в локалСторедж браузера
                setLocalStorageData(storageName, response.data);
                storeState.error = "Ошибок не обнаружено"
              });
            }
          }
        } else {
            setCacheAsData (response.error)
        }
    }).catch(error => {
        setCacheAsData (error)
    });

    function setCacheAsData (error) {
        console.log("error", error)
        //Если данные не были получены по какой либо причине-
        //ищем данные в локалСторедж
        const cachedData = getLocalStorageData(storageName);
        runInAction(() => {
            //Если дата есть - заношу в стор и предупреждаю что используются закешированные данные
            if (cachedData?.length > 0) {
                storeState.data = cachedData;
                storeState.state = DataStoreApiState.CACHE
            } else {
                storeState.state = DataStoreApiState.ERROR
            }
            storeState.error = error.message;
        });
    }
}

