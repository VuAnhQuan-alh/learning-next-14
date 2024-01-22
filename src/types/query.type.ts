import { AxiosRequestConfig } from 'axios';

import { MutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { IMappingProps, IRequestOptions } from './http.type';

export interface IConfigQuery extends Omit<UseQueryOptions, 'queryKey'> {
  config?: AxiosRequestConfig;
  option?: IRequestOptions;
}
export interface IOptionMutation extends MutationOptions {
  dataPath?: string;
  mapping?: IMappingProps;
}
