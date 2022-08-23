import { productsData } from '@mocks/productsData';
import { Product } from '@models/product.model';

export const getAll = (): Product[] | [] => {
    return productsData;
}

export const getById = (productId: string): Product | undefined => {
    return productsData.find((el) => el.id === productId);
}