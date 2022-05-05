import Axios from '@/api/axios';
import RequestType from '@/type/request';

class Request {
  request: Axios;

  constructor() {
    this.request = new Axios({
      baseURL: `${process.env.BASE_URL}/api`,
      timeout: 1000 * 60 * 5,
    });
  }

  get(config: RequestType.GetType) {
    const { url, params, headers } = config;
    return this.request.request({
      method: 'GET',
      url,
      params,
      headers,
    });
  }

  post(config: RequestType.PostType) {
    const { url, data, headers } = config;
    return this.request.request({
      method: 'POST',
      url,
      data,
      headers,
    });
  }

  put(config: RequestType.PutType) {
    const { url, data, headers } = config;
    return this.request.request({
      method: 'PUT',
      url,
      data,
      headers,
    });
  }

  delete(config: RequestType.DeleteType) {
    const { url, data, headers } = config;
    return this.request.request({
      method: 'DELETE',
      url,
      data,
      headers,
    });
  }

  postBlob(config: RequestType.PostType) {
    const { url, data, headers } = config;
    return this.request.request({
      method: 'POST',
      responseType: 'blob',
      url,
      data,
      headers,
    });
  }
}
const request = new Request();
export default request;
