export interface Options {
    repositoryId?: string;
    accessToken?: string;
    organizationId?: string;
}
type PlatformOptions = 'android' | 'ios';
export interface CreateReleaseParams {
    versionName: string;
    message: {
        title: string;
        url: string;
        platform: PlatformOptions;
        content?: string;
    };
}
export interface DeleteReleaseParams {
    versionName: string;
}
export interface CheckVersionParams {
    currentVersion: string;
    platform: PlatformOptions;
    page?: 1;
    pageSize?: 2;
}
declare enum SortTypeEnum {
    UPDATED_ASC = "updated_asc",
    UPDATED_DESC = "updated_desc",
    NAME_ASC = "name_asc",
    NAME_DESC = "name_desc"
}
export interface ShowListParams {
    page?: 1;
    pageSize?: 10;
    sort?: SortTypeEnum.NAME_DESC;
    search?: string;
}
export {};
