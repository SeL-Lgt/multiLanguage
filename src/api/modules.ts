import request from '@/api/request';
import { ModulesApi } from '@/api/api';
import { Result } from '@/type/api';
import ModulesType from '@/type/modules';

class ModulesServices {
  /**
   * 新增父级模块
   * @param {ModulesType.ModulesItem} data
   */
  static addModules = async (data: ModulesType.ModulesItem) => {
    const res = await request.post({
      url: ModulesApi.addModules,
      data,
    });
    return res as Result<ModulesType.ModulesItem>;
  };

  /**
   * 查询所有模块列表
   * 详情信息与模块文案数量
   * @param params
   */
  static queryModulesList = async (params: ModulesType.queryModules = {}) => {
    const res = await request.get({
      url: ModulesApi.queryModulesList,
      params,
    });
    return res as Result<Array<ModulesType.ModulesItem>>;
  };

  /**
   * 更新父模块内容
   * @param data
   */
  static updateModules = async (data: ModulesType.ModulesItem) => {
    const res = await request.post({
      url: ModulesApi.updateModules,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 查询所有模块名字
   */
  static queryModulesNameList = async () => {
    const res = await request.get({
      url: ModulesApi.queryModulesNameList,
    });
    return res as Result<Array<ModulesType.queryModules>>;
  };
}

export default ModulesServices;
