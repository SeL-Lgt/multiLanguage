import request from '@/api/request';
import { ModulesApi, SubModulesApi } from '@/api/api';
import { Pagination, PaginationList, Result } from '@/type/api';
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
  static queryModulesList = async (
    params: ModulesType.queryModules | (ModulesType.queryModules & Pagination),
  ) => {
    const res = await request.get({
      url: ModulesApi.queryModulesList,
      params,
    });
    return res as Result<PaginationList<Array<ModulesType.ModulesItem>>>;
  };

  /**
   * 更新父模块内容
   * @param data
   */
  static updateModules = async (data: ModulesType.ModulesItem) => {
    const res = await request.put({
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

  /**
   * 新增子模块
   * @param data
   */
  static addSubModules = async (data: ModulesType.SubModulesItem) => {
    const res = await request.post({
      url: SubModulesApi.addSubModules,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 查询子模块列表
   * @param params
   */
  static querySubModulesList = async (params: ModulesType.SubModulesItem) => {
    const res = await request.get({
      url: SubModulesApi.querySubModulesList,
      params,
    });
    return res as Result<PaginationList<Array<ModulesType.SubModulesItem>>>;
  };

  /**
   * 删除子模块
   * @param data
   */
  static deleteSubModules = async (data: ModulesType.SubModulesItem) => {
    const res = await request.delete({
      url: SubModulesApi.deleteSubModules,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 查询子模块列表
   * @param params
   */
  static querySubModulesNameList = async (
    params: ModulesType.SubModulesItem,
  ) => {
    const res = await request.get({
      url: SubModulesApi.querySubModulesNameList,
      params,
    });
    return res as Result<Array<ModulesType.SubModulesItem>>;
  };
}

export default ModulesServices;
