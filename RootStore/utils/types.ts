import {DataStoreApiState, initialStoreState, LicenseStoreState} from "@store/RootStore/utils/StoreStates";
import {StoresNames} from "@store/RootStore/utils/StoresNames";

// export type TStatusesStore = Omit<TDataStore, "api" | "store" | "getCurrentStoreData" | "getCurrentStoreState" | "getStoreError"> & {
//     statusesTypesStore : TDataStoreState,
//     currentStatusesStore : TDataStoreState,
//     apiStatusesTypes? : any,
//     apiStatusesColors? : any,
//     getAllColors : () => any,
//     getServiceCriteriaStatuses : () => any,
//     getServiceCriteriaMetricStatuses : () => any,
//     getServicesStatuses : () => void,
//     getSubjectsStatuses : () => void,
//     getMnemoStatusColor : (mnemo : "subjects" | "subject_service" | "subject_service_criteria" |
//         "subject_service_criteria_metric", id : number) => any,
//     getCurrentStoreData : (type : "StatusesTypes" | "StatusesColors") => any
//     getCurrentStoreState : (type : "StatusesTypes" | "StatusesColors") => any
//     getStoreError : (type : "StatusesTypes" | "StatusesColors") => any
// }

export type TWebsocketMessagesStore = {
    messages : any,
    updateMessages : (messages : any) => void
}

export type TInterfacePermissionsStore = {
    interfacePermissions : TInterfacePermissionsData,
    error : any,
    setUserInterfacePermissions : (rolePermissionId : number) => any
    getUserInterfacePermissions : () => any
}

export type TInterfacePermissionsData = {
    data : any[]
}

export type TRolePermissionsStore = {
    rolePermissions : TRolePermissionData,
    setRolePermissions : (rolePermissionId : number) => any
    getAccountRolePermissions : () => any
    error : any
}

export type TRolePermissionData = {
    data : any[]
}

export type TGroupPermissionsStore = {
    groupPermissions : TGroupPermissionsData
    setGroupPermissions : (groupPermissionId : number) => any
    getAccountGroupPermissions : () => any
    error : any,
}

export type TGroupPermissionsData = {
    id : number | null,
    name : string | null,
    documents : any[],
    service_types: any[],
    subject_types: any[],
    classifiers: any[],
    subjects: any[]
}

export type TStatusesStore = TStoreWithSubStores & {
    subStores : {
        statusesTypesStore : TDataStore,
        statusesColorsStore : TDataStore,
    },
    storeName : StoresNames,
    getStoreName : () => any,
}

export type TStoreWithSubStores = {
    subStores : {
        [key : string] : TDataStore
    }
}

export type TMetricTypesStore = TDataStore & {
    getMetricTypeById : (id : number) => any,
}

export type TClassifiersValuesStore = TDataStore & {
    getClassifiersValuesByTypeId : (classifierTypeId : number, asObject? : boolean) => any,
}

export type TRuleReactTypesValuesStore = TDataStore & {
    inactiveValues : any[]
    getValuesByRuleReactTypeId: (ruleReactTypeId: number, sla_flg : boolean) => []
}

export type TRuleReactTypeValuesObject = {
    id: number,
    description: string,
    colors: string,
    sla_flg : boolean,
    active_flg : boolean,
    rule_react_type : {
        id : number,
        name : string,
        created_at : string,
        updated_at : string
    },
    sort : number
}

export type TEventsStore = TDataStore & {
    get getNotEndedEvents() : any[]
}

export type TDataStore = {
    store : TDataStoreState,
    storeName : StoresNames,
    localStorageName : string,
    api? : any,
    fetchApiData : () => any,
    setApiUpdateLoop? : (time? : number) => any,
    getStoreDataAsObject? : () => any,
    getStoreItemById? : (id : number) => any,
    getCurrentStoreData : () => any,
    getCurrentStoreState : () => any,
    getStoreName : () => any,
    getStoreError : () => any
    forceUpdateStore : () => any
}

export type TLicenseStore = {
    store : TLicenseStoreState,
    storeName : StoresNames,
    localStorageName : string,
    api? : any,
    getLicenseInfo : () => any,
    fetchApiData : () => any,
    setApiUpdateLoop : (time? : number) => any,
    forceUpdateStore : () => any,
    getStoreName : () => any,
    getStoreError : () => any,
    getCurrentStoreState : () => any,
}

export type TAccountStore =  {
    storeName : StoresNames
    data : TAccountStoreState
    error : any
    rolePermissions : {
        data : any[],
        error : string | null
    },
    groupPermissions : {
        data : any[],
        error : string | null
    },
    interfacePermissions : {
        data : any[],
        error : string | null
    },
    // groupPermissionsStore : [],
    // rolePermissionsStore : [],
    // interfacePermissionsStore : [],
    setUserLoggedIn: ( data: TLoginResponseData) => void
    setRefreshedUser : (data : TApiRefreshUserData) => void
    //fetchApiData : () => any,
    setApiUpdateLoop : (time? : number, cancel? : boolean) => void,
    getStoreName : () => any,
    //getUser : () => any
    get getUserRolePermissions() : any[]
    get getUserGroupPermissions() : object
    get getUserInterfacePermissions() : any[]

    logOut : () => void

    refreshUserData : () => any,

    setRoles : (data : any) => void

    setRolePermissions : (roleId : number) => void
    setGroupPermissions : (groupPermissionId : number) => void
    setInterfacePermissions : (roleId : number) => void

    get getUser() : TAccountStoreState
}

export type TDataStoreState = {
    data: any;
    state: DataStoreApiState;
    error: string | null;
};

export type TLicenseStoreState = {
    data : any,
    state : LicenseStoreState,
    error : string | null
}

export type TAccountStoreState = TLoginResponseData & {
    isAuth : boolean
}

 export type TLoginResponseData = {
    token : string | null,
    user : TApiRefreshUserData
}

export type TApiRefreshUserData = {
    id : number | null,
    login : string | null,
    email : string | null,
    group_permission_id: number | null,
    role : {
        id : number | null,
        name : string | null,
        created_at: string | null,
        updated_at: string | null,
        permissions_flg: {
            [key : string] : boolean
        }
    },
    role_id : number | null,
    settings: string | null,
    user_group_id : number | null
}


