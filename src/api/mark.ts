import request from '@/api/request';
import MarkType from '@/type/mark.d';
import type { PaginationList, Result } from '@/type/api.d';
import { MarkApi } from '@/api/api';
import { Pagination } from '@/type/api.d';

class MarkServices {
  /**
   * 查询语言列表接口
   * isUsed: true已使用，false未使用，null所有
   * @param params
   */
  static queryMarkList = async (
    params:
      | MarkType.QueryMarkListType
      | (MarkType.QueryMarkListType & Pagination)
      | null,
  ) => {
    const res = await request.get({
      url: MarkApi.queryMarkList,
      params,
    });
    return res as Result<PaginationList<Array<MarkType.MarkItem>>>;
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
