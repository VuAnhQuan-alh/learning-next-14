export interface IRequestOptions {
  dataPath?: string;
  mapping?: IMappingProps;
}

export interface IPagination {
  total: number;
  page: number;
  size: number;
}

export interface IMappingProps<FROM = unknown, TO = unknown> {
  data: FROM;
  mapper: {
    [key: string]: keyof FROM;
  };
  keeps: string[];
  // eslint-disable-next-line
  handle?: (from: FROM) => Partial<TO>;
}

export type HttpClientType<T> = {
  data: T | null;
  message: string | null;
  meta: IPagination;
  status: number;
};
