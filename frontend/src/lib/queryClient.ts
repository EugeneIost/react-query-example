import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время, в течение которого данные считаются свежими
      staleTime: 5 * 60 * 1000, // 5 минут
      
      // Время хранения неиспользуемых данных в кэше
      gcTime: 10 * 60 * 1000, // 10 минут (в v5 cacheTime переименован в gcTime)
      
      // Количество повторных попыток при ошибке
      retry: 3,
      
      // Интервал между повторными попытками
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Не обновлять данные при фокусе окна
      refetchOnWindowFocus: false,
      
      // Не обновлять данные при переподключении
      refetchOnReconnect: true,
    },
    mutations: {
      // Количество повторных попыток при ошибке мутации
      retry: 1,
    },
  },
});