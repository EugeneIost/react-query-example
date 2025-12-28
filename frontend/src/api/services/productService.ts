import type { PaginatedResponse, Product } from '@/types/types'
import { ApiClient } from '../apiClient';

const apiClient = new ApiClient('/api');

export const productService = {
  getAllProducts: (page: number, limit: number): Promise<PaginatedResponse<Product>> => {
    return apiClient.get<PaginatedResponse<Product>>(`/products?page=${page}&limit=${limit}`);
  },

  getProductById: (id: number): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`);
  },

  createProduct: (productData: Omit<Product, 'id'>): Promise<Product> => {
    return apiClient.post<Product>('/products', productData);
  },

  updateProduct: (id: number, productData: Partial<Product>): Promise<Product> => {
    return apiClient.put<Product>(`/products/${id}`, productData);
  },

  deleteProduct: (id: number): Promise<void> => {
    return apiClient.delete(`/products/${id}`);
  },
};
