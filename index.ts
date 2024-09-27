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
  repositoryId: string;
  organizationId: string;
  accessToken:string;
  ref = 'master';
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
  createRelease(
    data: CreateReleaseParams
  ): Promise<Record<string, any>> {
    const {versionName,message} = data

    const body = {
      tagName:versionName,
      ref:this.ref,
      message:JSON.stringify(message)
    }
    const params = {
      organizationId:this.organizationId,
      repositoryId:this.repositoryId,
      accessToken:this.accessToken,
      body
    }
    return this.request.post(`/repository/${this.repositoryId}/tags/create`,params);
  }

  /**
   * 删除指定版本
   * @param params
   * @returns
   */
  deleteRelease(
    data: DeleteReleaseParams
  ): Promise<Record<string, any>> {
    const params = {
      repositoryId:this.repositoryId,
      organizationId:this.organizationId,
      accessToken:this.accessToken,
      tagName:data.versionName,
    }
    return this.request.delete(`/repository/${this.repositoryId}/tags/delete`,{ params });
  }

  /**
   * 查看已发布版本
   * @param params
   * @returns
   */
  showList(data: ShowListParams) {
    const params = {
      repositoryId:this.repositoryId,
      organizationId:this.organizationId,
      accessToken:this.accessToken,
      ...data
    }
    return this.request.get(`/repository/${this.repositoryId}/tag/list`,{ params });
  }
}

export const init = (params:CommonParams) => new Gvm(params);

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
