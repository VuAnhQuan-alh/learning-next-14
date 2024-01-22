import { HttpClientType } from '@oc/types/http.type';
import { IConfigQuery } from '@oc/types/query.type';
import { HttpClient } from '@oc/utils/http-query';
import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';

const useQueryCustom = <T>(
  keys: QueryKey,
  api: string,
  config_query: IConfigQuery,
) => {
  const { config, option, ...queryConfig } = config_query;

  const fetch = () =>
    HttpClient<T>(
      {
        url: api,
        method: 'GET',
        ...config,
      },
      { ...option },
    );

  const result = useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await fetch();
      if (!response) throw new Error('Network response was not ok');
      return response;
    },
    ...queryConfig,
  }) as UseQueryResult<HttpClientType<T>, unknown>;

  return { ...result };
};

export default useQueryCustom;
