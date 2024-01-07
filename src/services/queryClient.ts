import { QueryClient } from '@tanstack/react-query';

const defaultQueryConfig = {
  refetchOnWindowFocus: false,
  retry: false,
  retryOnMount: false,
};

const defaultMutationConfig = { retry: false };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultQueryConfig,
    mutations: defaultMutationConfig,
  },
});
