import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { headers } from '@libs/headers';
import { getAll } from '@services/product.service';

const getProductsList = async () => {
  try {
    const productsData = await getAll();
    console.log('getProductList Lambda: productsData: ', productsData);
    const res = formatJSONResponse({
      statusCode: 200,
      headers,
      result: productsData,
  });
    console.log('getProductList Lambda: response: ', res);
    return res;
  } catch (err) {
    console.error('getProductList Lambda: Error Encountered: ', err);
    return formatJSONResponse({
      statusCode: 500,
      headers,
      result: err,
    });
  }
};

export const main = middyfy(getProductsList);
