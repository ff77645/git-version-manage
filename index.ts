import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./config";
import {
  DeleteReleaseParams,
  ShowListParams,
  CreateReleaseParams,
  CommonParams,
} from "./types";

class Logger {
  static log(...arg) {
    console.log(...arg);
  }
  static error(...arg){
    console.error(...arg)
  }
}

class Gvm {
  request: AxiosInstance;
  repositoryId?: string;
  organizationId?: string;
  static _instance: Gvm;

  constructor(params:CommonParams) {
    if (Gvm._instance instanceof Gvm) return Gvm._instance;
    this.request = axios.create({
      baseURL: BASE_URL,
    });
    Object.assign(this,params)
    Gvm._instance = this;
  }

  /**
   * 创建版本
   * @param params
   * @returns
   */
  async createRelease(
    params: CreateReleaseParams
  ): Promise<Record<string, any>> {
    params.repositoryId = params.repositoryId || this.repositoryId;
    params.organizationId = params.organizationId || this.organizationId;
    const res = await this.request.post(
      `/repository/${params.repositoryId}/tags/create`,
      params
    );
    Logger.log(res);
    return res;
  }

  /**
   * 删除指定版本
   * @param params
   * @returns
   */
  async deleteRelease(
    params: DeleteReleaseParams
  ): Promise<Record<string, any>> {
    params.repositoryId = params.repositoryId || this.repositoryId;
    params.organizationId = params.organizationId || this.organizationId;
    const res = await this.request.delete(
      `/repository/${params.repositoryId}/tags/delete`,
      { params }
    );
    Logger.log(res);
    return res;
  }

  /**
   * 查看已发布版本
   * @param params
   * @returns
   */
  async showList(params: ShowListParams) {
    params.repositoryId = params.repositoryId || this.repositoryId;
    params.organizationId = params.organizationId || this.organizationId;
    const res = await this.request.get(
      `/repository/${params.repositoryId}/tag/list`,
      { params }
    );
    Logger.log(res);
    return res;
  }
}

export const initGvm = (params:CommonParams) => new Gvm(params);

export const createRelease = (params: CreateReleaseParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.createRelease(params);
};

export const deleteRelease = (params: DeleteReleaseParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.deleteRelease(params);
};

export const showList = (params: ShowListParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.showList(params);
};
