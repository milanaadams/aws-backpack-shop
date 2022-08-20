import { APIGatewayProxyEvent } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from '@mocks/products.json';

const getProductsById = async (event: APIGatewayProxyEvent) => {
  try {
    console.log('Incoming Event: ', JSON.stringify(event));
    console.log('Path Parameters: ', JSON.stringify(event.pathParameters));

    const { productId } = event.pathParameters;
    const itemById = products.find((el) => el.id === productId);
    console.log('getProductsById Lambda: search by id result: ', itemById);

    if(!itemById) {
        return formatJSONResponse({
            statusCode: 404,
            result: {
                message: 'Item is not found'
            },
        });
    }

    return formatJSONResponse({
      statusCode: 200,
      result: itemById,
    });
  } catch (err) {
    console.error('getProductList Lambda: Error Encountered: ', err);
    return formatJSONResponse({
      statusCode: 500,
      result: err,
    });
  }
};

export const main = middyfy(getProductsById);
