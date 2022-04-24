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

  static queryCopyWriting = async (params: CopyWriting.QueryCopyWriting) => {
    const res = await request.get({
      url: CopyWritingApi.queryCopyWriting,
      params,
    });
    return res as Result<Array<CopyWriting.QueryCopyWriting>>;
  };
}

export default CopyWritingServices;
