import {
  TAccountStoreState,
  TDataStoreState,
  TGroupPermissionsData, TInterfacePermissionsData, TLicenseStoreState, TRolePermissionData,
} from "@store/RootStore/utils/types";

export enum DataStoreApiState {
  NONE = "Не инициализировано",
  LOADING = "Загрузка",
  REFRESHING = "Обновление",
  FINISH = "Загружено",
  CACHE = "Используются закешированные данные",
  ERROR = "Ошибка. Данных нет",
}

export enum LicenseStoreState {
  NONE = "Не инициализировано",
  LOADING = "Попытка получения",
  REFRESHING = "Обновление",
  FINISH = "Активна",
  ERROR = "Ошибка лицензии",
}

export const initialInterfacePermissionsStoreState = {

}

export const initialLicenseStoreState : TLicenseStoreState = {
  data : [],
  state : LicenseStoreState.NONE,
  error : null
}

export const initialStoreState: TDataStoreState = {
  data: [],
  state: DataStoreApiState.NONE,
  error: null,
};

export const initialAccountStoreState : TAccountStoreState = {
  isAuth : false,
  token : null,
  user : {
    id : null,
    login : null,
    email : null,
    group_permission_id: null,
    role : {
      id : null,
      name : null,
      created_at: null,
      updated_at: null,
      permissions_flg: {}
    },
    role_id : null,
    settings: null,
    user_group_id : null
  }
}


export const initialGroupPermissionsState : TGroupPermissionsData = {
  id : null,
  name : null,
  documents : [],
  service_types: [],
  subject_types: [],
  classifiers: [],
  subjects: [],
}

export const initialRolePermissionsState : TRolePermissionData = {
  data : []
}

export const initialInterfacePermissionsState : TInterfacePermissionsData = {
  data : []
}
