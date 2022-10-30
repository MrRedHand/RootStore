import {autorun, makeAutoObservable, reaction, runInAction, toJS} from "mobx";
import {TAccountStore} from "@store/RootStore/utils/types";
import {initialAccountStoreState} from "@store/RootStore/utils/StoreStates";
import {StoresNames} from "@store/RootStore/utils/StoresNames";
import {getLocalStorageData, setLocalStorageData} from "@utils/localStorageDataController";
import {ApiAccount} from "@api/Account";
import _ from "lodash"
import {ApiRoles} from "@api/Roles";
import {ApiGroupPermissions} from "@api/GroupPermissions";

//TODO Исправить перезапрос данных (добавить сравнение?) - иначе перерендеры

const accountStore : TAccountStore = makeAutoObservable({
    data : initialAccountStoreState,
    rolePermissions : {
        data : [],
        error : null,
    },
    groupPermissions : {
        data : [],
        error : null
    },
    interfacePermissions : {
        data : [],
        error : null
    },
    error: null,
    storeName : StoresNames.AccountStore,
    refreshUserData : () => {

        const storageData = getLocalStorageData("KMUT-User-account")

        if (storageData?.user?.id) {
            ApiAccount.Services.getAccountById(storageData.user.id)
              .then((resolve : any) => {
                  if (resolve.success) {
                      //console.log("данные по юзер айди, пришедшие с апи: ", resolve.data)
                      accountStore.setRefreshedUser(resolve.data)
                  }
              })
        } else {
            console.log("Не получилось извлеч данные из локалСторедж. Какие данные есть: ", storageData)
        }


    },
    setRefreshedUser : (data)  => {

        const storageData = getLocalStorageData("KMUT-User-account")

        const isEqualWithStorage = _.isEqual(storageData, accountStore.data)

        if (!isEqualWithStorage) {
            runInAction(() => {accountStore.data = {...accountStore.data, ...storageData}})
        }

        const isEqual = _.isEqual(toJS(accountStore.data.user), data)

        if (!isEqual) {
            runInAction(() => accountStore.data.user = {...accountStore.data.user, ...data})
        }

        accountStore.setRoles(data)

    },
    setUserLoggedIn : (data) => {
        //данные присылаются из формы логина и записываются в локал-сторедж
        if (data) {
            runInAction(() => {
                console.log("данные юзера из формы логина: ", data)
                accountStore.data = {...accountStore.data, ...data}
                accountStore.data.isAuth = true
            })

            setLocalStorageData("KMUT-User-account", accountStore.data)

        }
    },
    setRoles(user) {
        //Если есть роль - достаю по апи
        if (user.role_id && (user.role_id !== undefined || null)) {
            accountStore.setRolePermissions(user.role_id)
            accountStore.setInterfacePermissions(user.role_id)
        }

        if (user.group_permission_id && (user.group_permission_id !== undefined || null)) {
            accountStore.setGroupPermissions(user.group_permission_id)
        }
    },
    setRolePermissions(id) {
        ApiRoles.Models.getPermissionsByRoleId({id : id})
          .then((resolve: any) => {
              runInAction(() => {
                  if (resolve.success) {
                      if (resolve.data?.length > 0) {

                          const isEqual = _.isEqual(toJS(accountStore.rolePermissions.data), resolve.data)

                          if (!isEqual) {
                              accountStore.rolePermissions.data = resolve.data
                          }
                      }
                  } else {
                      accountStore.rolePermissions.error = resolve.error
                  }
              })
          }).catch(error => {
            runInAction(() => accountStore.rolePermissions.error = error)
        })
    },
    setGroupPermissions(id) {
        ApiGroupPermissions.Services.getGroupPermissionsById(id)
          .then((resolve: any) => {
              runInAction(() => {
                  if (resolve.success) {

                      if (Object.entries(resolve.data).length > 0) {

                          const isEqual = _.isEqual(toJS(accountStore.groupPermissions.data), resolve.data)

                          if (!isEqual) {
                              accountStore.groupPermissions.data = resolve.data
                          }
                      }
                  } else {
                      accountStore.groupPermissions.error = resolve.error
                  }
              })

          }).catch(error => {
            runInAction(() => accountStore.groupPermissions.error = error)
          })
    },
    setInterfacePermissions(id) {
        ApiRoles.Services.getInterfacePermissions(id)
          .then((resolve: any) => {
              runInAction(() => {
                  if (resolve.success) {
                      if (resolve.data?.length > 0) {

                          const isEqual = _.isEqual(toJS(accountStore.interfacePermissions.data), resolve.data)

                          if (!isEqual) {
                              accountStore.interfacePermissions.data = resolve.data
                          }
                      }
                  } else {
                      accountStore.interfacePermissions.error = resolve.error
                  }
              })
          }).catch(error => {
            runInAction(() => accountStore.interfacePermissions.error = error)
        })
    },
    get getUserRolePermissions() : any[] {
        return toJS(accountStore.rolePermissions.data)
    },
    get getUserGroupPermissions() : object {
        return toJS(accountStore.groupPermissions.data)
    },
    get getUserInterfacePermissions() : any[]  {
        return toJS(accountStore.interfacePermissions.data)
    },
    setApiUpdateLoop : (time = 10000, cancel = false) => {
        const updateLoop = setInterval(() => {
            if (accountStore.data.isAuth) {
                accountStore.refreshUserData()
            }
        }, time);
        if (cancel) {clearInterval(updateLoop)}
        return () => clearInterval(updateLoop);
    },
    get getUser() {
        return toJS(accountStore.data)
    },
    getStoreName : () => {
        return accountStore.storeName
    },
    logOut : () => {
        runInAction(() => {
            accountStore.setApiUpdateLoop(0, true)
            accountStore.data.isAuth = false
        })
    }
})

reaction(
  () => {accountStore.data},
  () => function () {
      console.log("Запущена реакция на перезапись localStorage")
      setLocalStorageData("KMUT-User-account", accountStore.data)
  },
)


export default accountStore