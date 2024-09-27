
export interface CommonParams {
  repositoryId?:string,
  accessToken?:string,
  organizationId?:string,
}

export interface CreateReleaseParams {
  versionName:string,
  message:{
    title:string,
    url:string,
    content?:string
  }
}

export interface DeleteReleaseParams {
  versionName:string
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
