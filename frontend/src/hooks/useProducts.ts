import type { ApiError } from '@/api/apiClient';
import { productService } from '@/api/services/productService';
import type { PaginatedResponse, Product } from '@/types/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';

export const useProducts = (initialPage: number = 1, limit: number = 3, options?: UseQueryOptions<PaginatedResponse<Product>, Error>) => {
  const [page, setPage] = useState(initialPage);

  const queryResult = useQuery<PaginatedResponse<Product>, ApiError>({
    queryKey: ['products', page, limit],
    queryFn: () => productService.getAllProducts(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  return {
    ...queryResult,
    page,
    setPage,
  }
};

export const useProduct = (id: number, options?: UseQueryOptions<Product, ApiError>) => {
  return useQuery<Product, ApiError>({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // Запрос выполняется только если id существует
    ...options,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, ApiError, Omit<Product, 'id'>>({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, ApiError, { id: number; data: Partial<Product> }>({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: (data, variables) => {
      // queryClient.setQueryData<Product[]>(['products'], (oldProducts) => oldProducts?.map((product) => product.id === data.id ? data : product)); // Оптимистичное обновление данных в кэше
      // queryClient.invalidateQueries({ queryKey: ['product', variables.id] }); // помечает кэш как неактуаленный, делает рефетч фоном
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.setQueryData<Product>(['product', variables.id], data);
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: productService.deleteProduct,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};