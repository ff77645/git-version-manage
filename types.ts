
export interface Options {
  repositoryId?:string,
  //pt-5AHzOk4oNvuzBzVjmEImVHC0_328cb285-14cc-493d-b347-0ab63c9a0c81
  accessToken?:string,
  organizationId?:string,
}


type PlatformOptions = 'android' | 'ios'
export interface CreateReleaseParams {
  versionName:string,
  message:{
    title:string,
    url:string,
    platform:PlatformOptions,
    content?:string,
  }
}
export interface DeleteReleaseParams {
  versionName:string
}

export interface CheckVersionParams {
  currentVersion:string,
  platform:PlatformOptions,
  page?:1,
  pageSize?:2,
}

enum SortTypeEnum {
  UPDATED_ASC='updated_asc',
  UPDATED_DESC='updated_desc',
  NAME_ASC='name_asc',
  NAME_DESC='name_desc',
}


export interface ShowListParams {
  page?:1,
  pageSize?:10,
  sort?:SortTypeEnum.NAME_DESC,
  search?:string
}
