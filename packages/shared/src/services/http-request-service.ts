import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

/**
 * HTTP请求响应接口
 */
export interface HttpResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

/**
 * HTTP请求服务类
 */
export default class HttpRequestService {
  // axios实例
  private instance: AxiosInstance;
  // 基础配置
  private readonly baseConfig: AxiosRequestConfig = {
    baseURL: "", // 可以设置API基础URL
    timeout: 10000, // 请求超时时间
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  /**
   * 构造函数
   * @param config 自定义配置
   */
  constructor(config: AxiosRequestConfig = {}) {
    // 创建axios实例并合并配置
    this.instance = axios.create({
      ...this.baseConfig,
      ...config,
    });

    // 初始化拦截器
    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么，例如添加token
        const token = localStorage.getItem("token");

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      },
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据做点什么
        const { data } = response;
        // 根据后端接口规范处理响应
        if (data.code !== 200) {
          return Promise.reject(new Error(data.message || "请求失败"));
        }
        return data;
      },
      (error) => {
        // 对响应错误做点什么
        let message = "";
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            message = "未授权，请重新登录";
            // 可以在这里处理登出逻辑
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = "请求地址出错";
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          default:
            message = "网络连接异常";
        }
        return Promise.reject(new Error(message));
      },
    );
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   * @returns Promise
   */
  public get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    return this.instance.get(url, { params, ...config });
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    return this.instance.post(url, data, config);
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   * @returns Promise
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    return this.instance.put(url, data, config);
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns Promise
   */
  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    return this.instance.delete(url, config);
  }

  /**
   * 上传文件
   * @param url 请求地址
   * @param file 文件对象
   * @param filename 文件名参数名
   * @param config 请求配置
   * @returns Promise
   */
  public uploadFile<T = any>(
    url: string,
    file: File,
    filename: string = "file",
    config?: AxiosRequestConfig,
  ): Promise<HttpResponse<T>> {
    const formData = new FormData();
    formData.append(filename, file);

    return this.instance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
  }

  /**
   * 下载文件
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   * @returns Promise
   */
  public downloadFile(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<Blob> {
    return this.instance.get(url, {
      params,
      responseType: "blob",
      ...config,
    });
  }
}
