import * as DB from '../database/dynamoUtils';
import { v4 as uuidv4 } from 'uuid';
import { Product, ProductRequest } from '@models/product.model';

export const getAll = async(): Promise<Product[] | []> => await DB.getAll();

export const getById = async(productId: string): Promise<Product | undefined> => await DB.getById(productId);

export const createProduct = async(item: ProductRequest): Promise<Product> => {
    const {title, description, price, image, count} = item;
    const product = {
        id: uuidv4(),
        title,
        description,
        price,
        image,
        count
    }
    console.log('New Product to be put to DB: ', product);
    const res = await DB.createEntity(product);
    console.log('Put result: ', res);
    return res;
}