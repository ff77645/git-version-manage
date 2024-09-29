export interface Options {
    owner: string;
    repo: string;
    access_token: string;
    ref: string;
    proxy?: string;
}
type PlatformOptions = 'android' | 'ios';
export interface CreateReleaseParams {
    versionName: string;
    prerelease?: boolean;
    body: {
        title: string;
        url: string;
        platform: PlatformOptions;
        content?: string;
    };
}
export interface DeleteReleaseParams {
    id: number;
}
export interface CheckVersionParams {
    currentVersion: string;
}
export declare enum SortTypeEnum {
    ASC = "asc",
    DESC = "desc"
}
export interface ShowListParams {
    page?: 1;
    per_page?: 10;
    direction?: string;
}
export {};
