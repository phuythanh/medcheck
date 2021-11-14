import { useEffect, useState } from 'react';

export interface FetchResult<T> {
  loading: boolean;
  error?: any;
  data?: T;
}

export function useFetch<TResult>(fetchFn: () => Promise<TResult>, deps: unknown[] = []): FetchResult<TResult> {
  const [result, setResult] = useState<FetchResult<TResult>>({
    loading: true,
  });

  useEffect(() => {
    (async function () {
      try {
        setResult({ ...result, loading: true });
        const data = await fetchFn();
        setResult({ data, error: undefined, loading: false });
      } catch (error) {
        setResult({ ...result, error, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return result;
}
