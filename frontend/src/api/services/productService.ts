import type { Product } from '@/types/types'
import { apiClient } from '../apiClient'

export const productService = {
  getAllProducts: (): Promise<Product[]> => {
    return apiClient.get<Product[]>('/products');
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
