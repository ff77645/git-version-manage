import { DeleteReleaseParams, ShowListParams, CreateReleaseParams, Options, CheckVersionParams } from "./types";
import { AxiosInstance } from 'axios';
declare class Gvm {
    options: Options;
    client: AxiosInstance;
    static _instance: Gvm;
    constructor(options: Options);
    clearCache(): void;
    /**
     * 创建版本
     * @param params
     * @returns
     */
    createRelease(data: CreateReleaseParams): Promise<Record<string, any>>;
    /**
     * 删除指定版本
     * @param params
     * @returns
     */
    deleteRelease(data: DeleteReleaseParams): Promise<Record<string, any>>;
    /**
     * 查看已发布版本
     * @param params
     * @returns
     */
    showList(data?: ShowListParams): Promise<import("axios").AxiosResponse<any, any>>;
    /**
     * 检查是否有更新
     * @param data
     * @returns
     */
    checkVersion(data: CheckVersionParams): Promise<{
        success: boolean;
        data: any;
        name?: undefined;
        id?: undefined;
        versionName?: undefined;
        prerelease?: undefined;
        body?: undefined;
        err?: undefined;
    } | {
        success: boolean;
        name: any;
        id: any;
        versionName: any;
        prerelease: any;
        body: any;
        data?: undefined;
        err?: undefined;
    } | {
        success: boolean;
        data?: undefined;
        name?: undefined;
        id?: undefined;
        versionName?: undefined;
        prerelease?: undefined;
        body?: undefined;
        err?: undefined;
    } | {
        success: boolean;
        err: unknown;
        data?: undefined;
        name?: undefined;
        id?: undefined;
        versionName?: undefined;
        prerelease?: undefined;
        body?: undefined;
    }>;
}
export declare const init: (params: Options) => Gvm;
export declare const createRelease: (params: CreateReleaseParams) => void | Promise<Record<string, any>>;
export declare const deleteRelease: (params: DeleteReleaseParams) => void | Promise<Record<string, any>>;
export declare const showList: (params?: ShowListParams) => void | Promise<import("axios").AxiosResponse<any, any>>;
export declare const checkVersion: (params: CheckVersionParams) => void | Promise<{
    success: boolean;
    data: any;
    name?: undefined;
    id?: undefined;
    versionName?: undefined;
    prerelease?: undefined;
    body?: undefined;
    err?: undefined;
} | {
    success: boolean;
    name: any;
    id: any;
    versionName: any;
    prerelease: any;
    body: any;
    data?: undefined;
    err?: undefined;
} | {
    success: boolean;
    data?: undefined;
    name?: undefined;
    id?: undefined;
    versionName?: undefined;
    prerelease?: undefined;
    body?: undefined;
    err?: undefined;
} | {
    success: boolean;
    err: unknown;
    data?: undefined;
    name?: undefined;
    id?: undefined;
    versionName?: undefined;
    prerelease?: undefined;
    body?: undefined;
}>;
export {};
