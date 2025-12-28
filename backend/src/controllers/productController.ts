// src/controllers/itemController.ts
import { Request, Response, NextFunction } from 'express';
import { readProductsFromFile, writeProductsToFile, getNextId } from '../models/product';
import { Product } from '../types/type';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const products = await readProductsFromFile();

    const newProduct: Product = { 
      id: await getNextId(), 
      ...req.body
    };
    
    products.push(newProduct);
    await writeProductsToFile(products);
    
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const products = await readProductsFromFile();
//     res.json(products);
//   } catch (error) {
//     next(error);
//   }
// };

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await readProductsFromFile();
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    const pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    } = {
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalItems: products.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < products.length,
      hasPrevPage: startIndex > 0
    };
    
    res.json({
      success: true,
      data: paginatedProducts,
      pagination
    });
    
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const products = await readProductsFromFile();
    const product = products.find((i) => i.id === id);

    if (!product) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
  
    const products = await readProductsFromFile();
    const productIndex = products.findIndex((i) => i.id === id);
    
    if (productIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    products[productIndex] = { ...req.body };
    await writeProductsToFile(products);
    
    res.json(products[productIndex]);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const products = await readProductsFromFile();
    const productIndex = products.findIndex((i) => i.id === id);
    
    if (productIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    await writeProductsToFile(products);
    
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};