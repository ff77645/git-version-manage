import {
  DeleteReleaseParams,
  ShowListParams,
  CreateReleaseParams,
  Options,
  CheckVersionParams,
} from "./types";
import { formatVersionName,compareVersion } from "./helper";
import axios, { AxiosInstance } from 'axios'
import {BASE_URL} from './config'

class Logger {
  static log(...arg:any) {
    console.log(...arg);
  }
  static error(...arg:any){
    console.error(...arg)
  }
}

class Gvm {
  options!: Options;
  client!:AxiosInstance;
  static _instance: Gvm;

  constructor(options:Options) {
    if (Gvm._instance instanceof Gvm) return Gvm._instance;
    this.options = options
    const url = `${BASE_URL}/${options.owner}/${options.repo}`
    const baseURL = options.proxy ? `${options.proxy}/${url}` : url
    this.client = axios.create({
      baseURL
    })
    this.client.interceptors.response.use(response=>response.data,err=>Promise.reject(err))
    Gvm._instance = this;
  }

  clearCache(){
    const options = this.options
    axios.delete(`${options.proxy}/cache-clear`,{
      params:{
        url:`${BASE_URL}/${options.owner}/${options.repo}/releases`
      }
    })
    axios.delete(`${options.proxy}/cache-clear`,{
      params:{
        url:`${BASE_URL}/${options.owner}/${options.repo}/releases/latest`
      }
    })
  }

  /**
   * 创建版本
   * @param params
   * @returns
   */
  async createRelease(
    data: CreateReleaseParams
  ): Promise<Record<string, any>> {
    const {versionName,body,prerelease=false} = data
    const params = {
      tag_name:formatVersionName(versionName),
      name:body.title,
      body:JSON.stringify(body),
      prerelease:prerelease,
      access_token:this.options.access_token,
      target_commitish:this.options.ref
    }
 
    const res = await this.client.post('/releases',params)
    if(this.options.proxy) this.clearCache()
    return res
  }

  /**
   * 删除指定版本
   * @param params
   * @returns
   */
  async deleteRelease(
    data: DeleteReleaseParams
  ): Promise<Record<string, any>> {

    const params = {
      access_token:this.options.access_token
    }

    const res = await this.client.delete(`/releases/${data.id}`,{params})
    if(this.options.proxy) this.clearCache()
    return res
  }

  /**
   * 查看已发布版本
   * @param params
   * @returns
   */
  async showList(data?: ShowListParams) {
    const params = {
      access_token:this.options.access_token,
      page:data?.page || 1,
      per_page:data?.per_page || 10,
      direction:data?.direction || 'desc',
    }
   
    const res = await this.client.get(`/releases`,{params})
    return res
  }


  /**
   * 检查是否有更新
   * @param data 
   * @returns 
   */
  async checkVersion(data:CheckVersionParams){
    const {currentVersion} = data
    try{
      const res:any = await this.client.get(`/releases/latest`,{params:{
        access_token:this.options.access_token
      }})
      if(!res) return {
        success:false,
        data:res,
      }
      const hasUpdate = compareVersion(res.tag_name,currentVersion)
      if(hasUpdate) return {
        success:true,
        name:res.name,
        id:res.id,
        versionName:res.tag_name,
        prerelease:res.prerelease,
        body:JSON.parse(res.body)
      }
      return {
        success:true,
      }
    }catch(err){
      return {
        success:false,
        err:err
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

export const showList = (params?: ShowListParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.showList(params);
};

export const checkVersion = (params: CheckVersionParams) => {
  if (!Gvm._instance) return Logger.error("实例不存在");
  return Gvm._instance.checkVersion(params);
};
