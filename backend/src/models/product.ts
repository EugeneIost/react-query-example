import fs from 'fs/promises';
import path from 'path';
import { Product } from '../types/type';

const dataFilePath = path.join(__dirname, '../data/products.json');

export const readProductsFromFile = async (): Promise<Product[]> => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeProductsToFile = async (products: Product[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf-8');
};

export const getNextId = async (): Promise<number> => {
  const products = await readProductsFromFile();
  if (products.length === 0) return 1;
  const maxId = Math.max(...products.map(item => item.id));
  return maxId + 1;
};