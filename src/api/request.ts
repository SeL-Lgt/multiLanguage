import Axios from '@/api/axios';
import RequestType from '@/type/request';

class Request {
  request: Axios;

  constructor() {
    this.request = new Axios({
      baseURL: `http://localhost:3000/api`,
      timeout: 1000 * 60 * 5,
    });
  }

  get(config: RequestType.GetType) {
    const { url, params } = config;
    return this.request.request({
      method: 'GET',
      url,
      params,
    });
  }

  post(config: RequestType.PostType) {
    const { url, data } = config;
    return this.request.request({
      method: 'POST',
      url,
      data,
    });
  }

  put(config: RequestType.PutType) {
    const { url, data } = config;
    return this.request.request({
      method: 'PUT',
      url,
      data,
    });
  }

  delete(config: RequestType.DeleteType) {
    const { url, data } = config;
    return this.request.request({
      method: 'DELETE',
      url,
      data,
    });
  }
}
const request = new Request();
export default request;
