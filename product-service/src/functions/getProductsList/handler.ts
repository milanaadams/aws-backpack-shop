import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from '@mocks/products.json';

const getProductsList = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('getProductList Lambda: Incoming Event: ', JSON.stringify(event));
    return formatJSONResponse({
      statusCode: 200,
      result: products,
    });
  } catch (err) {
    console.error('getProductList Lambda: Error Encountered: ', err);
    return formatJSONResponse({
      statusCode: 500,
      result: err,
    });
  }
};

export const main = middyfy(getProductsList);
