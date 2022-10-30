import {makeAutoObservable} from "mobx";
import {ApiRoles} from "@api/Roles";
import {TInterfacePermissionsStore} from "@store/RootStore/utils/types";
import {initialInterfacePermissionsState} from "@store/RootStore/utils/StoreStates";

const interfacePermissionsStore : TInterfacePermissionsStore = makeAutoObservable({
    interfacePermissions : initialInterfacePermissionsState,
    error : null,
    setUserInterfacePermissions : (roleId) => {

        ApiRoles.Services.getInterfacePermissions(roleId)
            .then((resolve: any) => {
                if (resolve.success) {
                    interfacePermissionsStore.interfacePermissions = resolve.data
                } else {
                    interfacePermissionsStore.error = resolve.error
                }
            }).catch(error => {
            interfacePermissionsStore.error = error
        })
    },
    getUserInterfacePermissions : () => {
        return interfacePermissionsStore.interfacePermissions
    }
})

export default interfacePermissionsStore