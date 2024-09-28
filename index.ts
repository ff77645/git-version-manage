import {
  DeleteReleaseParams,
  ShowListParams,
  CreateReleaseParams,
  Options,
  CheckVersionParams
} from "./types";
import { formatVersionName,compareVersion } from "./helper";
import devops20210625, * as $devops20210625 from '@alicloud/devops20210625';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';

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
  ref = 'master';
  client!:devops20210625;
  static _instance: Gvm;

  constructor(options:Options) {
    if (Gvm._instance instanceof Gvm) return Gvm._instance;
    this.options = options
    this.client = this.createClient(options)
    Gvm._instance = this;
  }

  createClient({accessKeyId,accessKeySecret}:Options){
    let config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret,
    });
    config.endpoint = `https://devops.cn-hangzhou.aliyuncs.com`;
    return new devops20210625(config);
  }

  /**
   * 创建版本
   * @param params
   * @returns
   */
  async createRelease(
    data: CreateReleaseParams
  ): Promise<Record<string, any>> {
    const {versionName,message} = data
    const params = {
      organizationId: this.options.organizationId,
      accessToken: this.options.accessToken,
      tagName:`${message.platform}-${formatVersionName(versionName)}`,
      ref:this.ref,
      message:JSON.stringify(message)
    }
    console.log({params});
    let createTagRequest = new $devops20210625.CreateTagRequest(params);
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    const {body} = await this.client.createTagWithOptions(
      this.options.repositoryId, 
      createTagRequest, 
      headers, 
      runtime
    )
    return body as any
  }

  /**
   * 删除指定版本
   * @param params
   * @returns
   */
  async deleteRelease(
    data: DeleteReleaseParams
  ): Promise<Record<string, any>> {
    let deleteTagRequest = new $devops20210625.DeleteTagRequest({
      organizationId: this.options.organizationId,
      accessToken: this.options.accessToken,
      tagName:`${data.platform}-${formatVersionName(data.versionName)}`,
    });
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    const {body} = await this.client.deleteTagWithOptions(
      this.options.repositoryId, 
      deleteTagRequest, 
      headers, 
      runtime
    )
    return body as any
  }

  /**
   * 查看已发布版本
   * @param params
   * @returns
   */
  async showList(data?: ShowListParams) {
    data = data || {}
    const {platform} = data
    let listRepositoryTagsRequest = new $devops20210625.ListRepositoryTagsRequest({
      organizationId: this.options.organizationId,
      accessToken: this.options.accessToken,
      ...data,
      search:platform
    });
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    const {body} = await this.client.listRepositoryTagsWithOptions(
      this.options.repositoryId, 
      listRepositoryTagsRequest, 
      headers, 
      runtime
    );
    return body as any
  }


  /**
   * 检查是否有更新
   * @param data 
   * @returns 
   */
  async checkVersion(data:CheckVersionParams){
    const {currentVersion,platform,...params} = data
    try{
      const {result,success} = await this.showList({platform,...params as ShowListParams})
      if(!success) return {
        success:false
      }
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
