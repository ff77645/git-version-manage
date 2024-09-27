
export interface CommonParams {
  repositoryId?:string,
  accessToken?:string,
  organizationId?:string,
}

export interface CreateReleaseParams extends CommonParams {
  body:{
    tagName:string,
    ref:string,
    message:string
  }
}

export interface DeleteReleaseParams extends CommonParams {
  tagName:string
}

enum SortTypeEnum {
  UPDATED_ASC='updated_asc',
  UPDATED_DESC='updated_desc',
  NAME_ASC='name_asc',
  NAME_DESC='name_desc',
}


export interface ShowListParams extends CommonParams {
  page?:1,
  pageSize?:10,
  sort?:SortTypeEnum.NAME_DESC,
  search?:string
}
