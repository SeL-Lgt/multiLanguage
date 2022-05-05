import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  ResponseType,
} from 'axios';

declare namespace RequestType {
  interface RequestInterceptors {
    // 请求拦截
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorsCatch?: (err: any) => any;
    // 响应拦截
    responseInterceptors?: <T = AxiosResponse>(config: T) => T;
    responseInterceptorsCatch?: (err: any) => any;
  }
  // 自定义传入的参数
  interface RequestConfig extends AxiosRequestConfig {
    interceptors?: RequestInterceptors;
  }

  interface RequestDataType {
    url: string;
    interceptors?: {
      requestInterceptors: () => unknown;
      responseInterceptors: () => unknown;
    };
    headers?: AxiosRequestHeaders;
    responseType?: ResponseType;
  }

  interface GetType extends RequestDataType {
    params?: unknown;
  }

  interface PostType extends RequestDataType {
    data?: unknown;
  }

  interface PutType extends RequestDataType {
    data?: unknown;
  }

  interface DeleteType extends RequestDataType {
    data?: unknown;
  }
}

export default RequestType;
