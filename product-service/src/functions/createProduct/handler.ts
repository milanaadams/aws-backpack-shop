import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { headers } from '@libs/headers';
import * as productService from '@services/product.service';

const createProduct = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('createProduct Lambda: Event: ', event);
    const data = JSON.parse(JSON.stringify(event.body));
    console.log('createProduct Lambda: data: ', data);
    const newProduct = await productService.createProduct(data);
    console.log('createProduct Lambda: new product: ', newProduct);
    const res = formatJSONResponse({
      statusCode: 200,
      headers,
      message: 'new product was sucessfully created',
      result: newProduct,
  });
    console.log('createProduct Lambda: response: ', res);
    return res;
  } catch (err) {
    console.error('createProduct Lambda: Error Encountered: ', err);
    return formatJSONResponse({
      statusCode: 500,
      headers,
      result: err,
    });
  }
};

export const main = middyfy(createProduct);
