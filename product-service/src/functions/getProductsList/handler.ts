import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getAll } from '@services/product.service';

const getProductsList = async () => {
  try {
    const productsData = getAll();
    console.error('getProductList Lambda: productsData: ', productsData);
    return formatJSONResponse({
      statusCode: 200,
      result: productsData,
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
