import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./config";
import {
  DeleteReleaseParams,
  ShowListParams,
  CreateReleaseParams,
  Options,
  CheckVersionParams
} from "./types";
import { formatVersionName,compareVersion } from "./helper";

class Logger {
  static log(...arg:any) {
    console.log(...arg);
  }
  static error(...arg:any){
    console.error(...arg)
  }
}

class Gvm {
  request!: AxiosInstance;
  options!: Options;
  ref = 'master';
  static _instance: Gvm;

  constructor(options:Options) {
    if (Gvm._instance instanceof Gvm) return Gvm._instance;
    this.request = axios.create({
      baseURL: BASE_URL,
    });
    this.options = options
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
      tagName:`${message.platform}-${formatVersionName(versionName)}`,
      ref:this.ref,
      message:JSON.stringify(message)
    }
    const params = {
      ...this.options,
      body
    }
    return this.request.post(`/repository/${this.options.repositoryId}/tags/create`,params);
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
      ...this.options,
      tagName:data.versionName,
    }
    return this.request.delete(`/repository/${this.options.repositoryId}/tags/delete`,{ params });
  }

  /**
   * 查看已发布版本
   * @param params
   * @returns
   */
  showList(data: ShowListParams) {
    const params = {
      ...this.options,
      ...data
    }
    return this.request.get(`/repository/${this.options.repositoryId}/tag/list`,{ params });
  }


  /**
   * 检查是否有更新
   * @param data 
   * @returns 
   */
  async checkVersion(data:CheckVersionParams){
    const {currentVersion} = data
    const params = {
      ...this.options,
      search:data.platform,
      ...data
    }
    try{
      const { data:{result} } = await this.request.get(
        `/repository/${this.options.repositoryId}/tag/list`,
        {params}
      )
      if(result.length){
        const release = result.find((item:any)=>{
          const version = item.name.split('-')[1]
          return compareVersion(currentVersion,version)
        })
        if(release){
          return {
            success:true,
            version:release.name.split('-')[1],
            data:JSON.parse(release.message)
          }
        }else{
          return {
            success:true
          }
        }
      }else{
        return {
          success:true
        }
      }
    }catch(err){
      return {
        success:false,
      }
    }
  }
}

export const init = (params:Options) => new Gvm(params);

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

export const checkVersion = (params: CheckVersionParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.checkVersion(params);
};
