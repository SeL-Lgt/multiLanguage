import request from '@/api/request';
import MarkType from '@/type/mark.d';
import type { Pagination, Result } from '@/type/api.d';
import { MarkApi } from '@/api/api';

class MarkServices {
  /**
   * 查询语言列表接口
   * @param {Object<MarkType.QueryMarkListType>} data
   * isUsed: true已使用，false未使用，null所有
   */
  static queryMarkList = async (data: MarkType.QueryMarkListType = {}) => {
    const res = await request.post({
      url: MarkApi.queryMarkList,
      data,
    });
    return res as Result<Pagination<Array<MarkType.MarkItem>>>;
  };

  static addMark = async (data: MarkType.MarkItem) => {
    const res = await request.post({
      url: MarkApi.addMark,
      data,
    });
    return res as Result<any>;
  };

  static updateMark = async (data: MarkType.MarkItem) => {
    const res = await request.put({
      url: MarkApi.updateMark,
      data,
    });
    return res as Result<any>;
  };
}

export default MarkServices;
