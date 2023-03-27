// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';

enum BASE {
  workSpace = 'lzdrdbl-classify-service',
}
// home树
const getHomeTree = (data: any) => post<any>({ url: `${BASE.workSpace}/Classify/treeData`, data });

export { getHomeTree };
