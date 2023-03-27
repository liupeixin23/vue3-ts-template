// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';

enum BASE {
  dict = 'lezao-dict-service',
  home = 'lz624-home',
  lzos = 'lzos-pfmanage-service',
}
// 字典
const getMoreDictEntryGroup = (data: any) => post<any>({ url: `${BASE.dict}/lezaoDictionaries/getMoreDictEntryGroup`, data });
// 历史记录
const getHistory = (data: any) => post<any>({ url: `${BASE.home}/BomHistory/findBomHistory`, data });
// 详情
const getBomDetail = () => get<any>({ url: `${BASE.lzos}/lezaoAppTenantConfig/detail` });
// 应用列表
const getApplication = (params: any) => get<any>({ url: `${BASE.lzos}/myApplication/userGroupApplication`, params });
export { getMoreDictEntryGroup, getHistory, getBomDetail, getApplication };
