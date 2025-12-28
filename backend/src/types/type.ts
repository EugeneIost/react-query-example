export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;

    characterictics: {
        article: string;
        type: string;
        material: string;
        height: number;
        width: number;
        country: string;
    }[];
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }