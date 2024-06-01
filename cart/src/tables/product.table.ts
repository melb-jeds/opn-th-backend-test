import { Product } from '../types/product.type'

export type ProductTable = Record<string, Product>

export const productTable: ProductTable = {}
