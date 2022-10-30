import {makeAutoObservable, toJS} from "mobx";
import {ApiRoles} from "@api/Roles";
import {TRolePermissionsStore} from "@store/RootStore/utils/types";
import {initialRolePermissionsState} from "@store/RootStore/utils/StoreStates";

/**
 * сейчас этот стор ичпользуется как инструмент внутри аккаунт стора
 * НЕ грузится в рут стор
 */

const rolePermissionsStore : TRolePermissionsStore = makeAutoObservable({
    rolePermissions : initialRolePermissionsState,
    error : null,
    setRolePermissions : (roleId) => {

        ApiRoles.Models.getPermissionsByRoleId({id : roleId})
            .then((resolve: any) => {
                if (resolve.success) {
                    rolePermissionsStore.rolePermissions = resolve.data
                } else {
                    rolePermissionsStore.error = resolve.error
                }
            }).catch(error => {
                rolePermissionsStore.error = error
        })
    },
    getAccountRolePermissions : () => {
        return rolePermissionsStore.rolePermissions
    }

})

export default rolePermissionsStore