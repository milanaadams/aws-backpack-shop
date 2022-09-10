import AWS from 'aws-sdk';
import { Product } from '@models/product.model';

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME;

export const createEntity = async(item: Product): Promise<Product> => {

    try {
        await db.put({
            TableName: TABLE_NAME,
            Item: item
        }).promise();
        console.log('Create Entity res: ');
        
        const res = await getById(item.id);
        if(!res) throw new Error;
        return res;
    } catch(err) {
        console.log('Create Entity error: ', err);
    }
}

export const getAll = async(): Promise<Product[]> => {
    try {
        const products = await db.scan({
            TableName: TABLE_NAME
        }).promise();

        console.log('Get all result: products.Items');
        return products.Items as Product[];
    } catch(err) {
        console.log('Get all error: ', err);
    }
}

export const getById = async(id: string): Promise<Product> => {
    try {
        const output = await db.get({
            TableName: TABLE_NAME,
            Key: { id }
        }).promise();
        return output.Item as Product;
    } catch(err) {
        console.log('Get By Id error: ', err);
    }
}
