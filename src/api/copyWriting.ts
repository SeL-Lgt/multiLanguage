import request from '@/api/request';
import { CopyWritingApi } from '@/api/api';
import { Result } from '@/type/api';
import CopyWriting from '@/type/copyWriting';

class CopyWritingServices {
  /**
   * 新增语言信息文案
   * @param data
   */
  static addCopyWriting = async (data: CopyWriting.CopyWritingFormDataType) => {
    const res = await request.post({
      url: CopyWritingApi.addCopyWriting,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 查询语言文案列表
   * @param params
   */
  static queryCopyWriting = async (params: CopyWriting.QueryCopyWriting) => {
    const res = await request.get({
      url: CopyWritingApi.queryCopyWriting,
      params,
    });
    return res as Result<Array<CopyWriting.QueryCopyWriting>>;
  };

  /**
   * 根据modulesKey、subModulesKey、copyKey查询文案详情
   * @param params
   */
  static queryCopyWritingByCopyKey = async (
    params: CopyWriting.QueryCopyWriting,
  ) => {
    const res = await request.get({
      url: CopyWritingApi.queryCopyWritingByCopyKey,
      params,
    });
    return res as Result<CopyWriting.CopyWritingFormDataType>;
  };

  /**
   * 删除指定文案
   * @param params
   */
  static deleteCopyWriting = async (data: CopyWriting.DeleteCopyWriting) => {
    const res = await request.delete({
      url: CopyWritingApi.deleteCopyWriting,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 更新文案
   * @param data
   */
  static updateCopyWriting = async (
    data: CopyWriting.CopyWritingFormDataType,
  ) => {
    const res = await request.put({
      url: CopyWritingApi.updateCopyWriting,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 上传文案
   * @param data
   */
  static uploadCopyWriting = async (data: FormData) => {
    const res = await request.post({
      url: CopyWritingApi.uploadCopyWriting,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    });
    return res as Result<any>;
  };

  /**
   * 下载文案
   * @param data
   */
  static downloadCopyWriting = async <T>(
    data: CopyWriting.DownLoadWriting<T>,
  ) => {
    const res = await request.postBlob({
      url: CopyWritingApi.downloadCopyWriting,
      data,
    });
    return res as Result<any>;
  };

  /**
   * 下载导入文案模板
   * @param data
   */
  static downloadDefaultCopyExcel = async () => {
    const res = await request.postBlob({
      url: CopyWritingApi.downloadDefaultCopyExcel,
    });
    return res as Result<any>;
  };
}

export default CopyWritingServices;
