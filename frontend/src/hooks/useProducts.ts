import { productService } from '@/api/services/productService';
import type { Product } from '@/types/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useProducts = (options?: UseQueryOptions<Product[], Error>) => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts(),
    ...options,
  });
};

export const useProduct = (id: number, options?: UseQueryOptions<Product, Error>) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // Запрос выполняется только если id существует
    ...options,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Omit<Product, 'id'>>({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: number; data: Partial<Product> }>({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Product>(['product', variables.id], data); // Оптимистичное обновление данных в кэше
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] }); // помечает кэш как неактуаленный, делает рефетч фоном
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: productService.deleteProduct,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};