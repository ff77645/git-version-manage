

export const formatVersionName = (versionName:string):string =>{
  const arr = versionName.split('.')
  if(arr.length > 3) throw Error('版本格式错误')
  arr.forEach(strNum=>{
    const num = Number(strNum)
    if(num < 0 || Number.isNaN(num)) throw Error('版本格式错误')
  })
  if(arr.length === 3) return arr.join('.')
  arr.push('0')
  return formatVersionName(arr.join('.'))
}


export const compareVersion = (v1:string,v2:string)=>{
  const v1_arr = v1.split('.')
  const v2_arr = v2.split('.')
  return (
    v2_arr[0] > v1_arr[0] ||
    v2_arr[1] > v1_arr[1] ||
    v2_arr[2] > v1_arr[2] 
  )
}