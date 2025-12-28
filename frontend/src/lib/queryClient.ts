import { ApiError } from '@/api/apiClient';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

// Кэши для глобальной отображении ошибки
const queryCache = new QueryCache({
  onError: (error: Error) => {
    if (error instanceof ApiError) {

      // Глобальная обработка ошибок запросов
      console.error('Query Error:', error.message);
      // showNotification(error.message, 'error');
    }
  }
});

const mutationCache = new MutationCache({
  onError: (error: Error) => {
    if (error instanceof ApiError) {

      // Глобальная обработка ошибок мутаций
      console.error('Mutation Error:', error.message);
      // showNotification(error.message, 'error');
    }
  }
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      // Время, в течение которого данные считаются свежими
      staleTime: 5 * 60 * 1000, // 5 минут
      
      // Время хранения неиспользуемых данных в кэше
      gcTime: 10 * 60 * 1000, // 10 минут
      
      // Количество повторных попыток при ошибке
      retry: false,
      
      // Интервал между повторными попытками
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Не обновлять данные при фокусе окна
      refetchOnWindowFocus: false,
      
      // Не обновлять данные при переподключении
      refetchOnReconnect: true,
    },
    mutations: {
      // Количество повторных попыток при ошибке мутации
      retry: false,
    },
  },
});