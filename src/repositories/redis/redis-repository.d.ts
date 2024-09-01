export type ConfigFieldsType = "labels" | "scan"

//UNIDADES
export type labelType = {[labelName:string]:string[]}
//AGRUPAMENTOS
export type configsType = {
    labels?:labelConfigurationsType,
    scan?:string
}
//ATRIBUIÇÕES
export type ConfigUsersType = {
    [userId:number]:configsType
}
//CONFIGURAÇAO COM TOKEN(deploy_name)tracker)
export type ConfigType = {
    deploy_label_tracker:deployNameTrackerUserType
}