import {
  HttpClientType,
  IPagination,
  IRequestOptions,
} from '@oc/types/http.type';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import _ from 'lodash';
import { mappingData } from './mapping-data';
import { PAGINATION } from '@oc/constants/pagination';

const headers: AxiosRequestConfig['headers'] = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
const timeout = 10 * 60 * 1000;

class CustomAxios {
  private instance!: AxiosInstance;

  constructor() {
    const instance = axios.create({ headers, timeout });

    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error) => Promise.reject(error),
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        const { response } = error;

        if (response && response.status === 401) {
          this.signOut();
        }
        return Promise.reject(error);
      },
    );

    this.instance = instance;
  }

  public get Instance(): AxiosInstance {
    return this.instance;
  }

  private signOut() {
    console.debug('sign out');
    return '';
  }
}

const _axios = new CustomAxios();
export const HttpClient = async <T>(
  configs: AxiosRequestConfig,
  options?: IRequestOptions,
): Promise<HttpClientType<T>> => {
  const { dataPath = 'data', mapping } = options || {};
  const response = await _axios.Instance(configs);

  const dataWithPath = dataPath ? _.get(response, dataPath) : response;
  const dataWithMap = mapping
    ? mappingData({
        data: dataWithPath,
        mapper: mapping.mapper,
        keeps: mapping.keeps,
        handle: mapping.handle,
      })
    : dataWithPath;

  const message = _.get(response, 'message') || 'Not message!';
  const meta: IPagination = {
    total: Number(_.get(response, 'total')) || PAGINATION.total,
    size: Number(_.get(response, 'limit')) || PAGINATION.size,
    page: Number(_.get(response, 'page')) || PAGINATION.page,
  };
  const status: number = _.get(response, 'statusCode') || 302;

  return { data: dataWithMap, message, meta, status };
};
