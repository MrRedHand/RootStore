import {makeAutoObservable, toJS} from "mobx";
import {ApiGroupPermissions} from "@api/GroupPermissions";
import {TGroupPermissionsStore} from "@store/RootStore/utils/types";
import {initialGroupPermissionsState} from "@store/RootStore/utils/StoreStates";

/**
 * сейчас этот стор ичпользуется как инструмент внутри аккаунт стора
 * НЕ грузится в рут стор
 */
const groupPermissionsStore : TGroupPermissionsStore = makeAutoObservable({
    groupPermissions : initialGroupPermissionsState,

    error : null,

    setGroupPermissions : (groupPermissionId) => {

        ApiGroupPermissions.Services.getGroupPermissionsById(groupPermissionId)
            .then((resolve: any) => {
                if (resolve.success) {
                    groupPermissionsStore.groupPermissions = resolve.data
                } else {
                    groupPermissionsStore.error = resolve.error
                }

            }).catch(error => {
            groupPermissionsStore.error = error})
    },
    getAccountGroupPermissions : () => {
        return groupPermissionsStore.groupPermissions
    }
})

export default groupPermissionsStore