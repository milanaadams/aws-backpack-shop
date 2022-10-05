import { formatJSONResponse } from '@libs/api-gateway';
import { headers } from '@libs/headers';
import { middyfy } from '@libs/lambda';

import * as AWS from 'aws-sdk';

export const importProductsFile = async(event: any) => {
  const { name } = event.queryStringParameters;

  if (!name) {
    console.log('Error: no filename provided');
    return formatJSONResponse({
      response: 'Error: no filename provided',
      statusCode: 500,
      headers,
    });
  }

  const s3 = new AWS.S3({ region: 'eu-central-1' });

  try {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: BUCKET_NAME,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv',
    });

    console.log('Bucket name: ', BUCKET_NAME);
    console.log('Signed Url: ', url);

    const res = formatJSONResponse({
      statusCode: 200,
      headers,
      response: url,
  });

  console.log('Response: ', res);

  return res;

  } catch(err) {
    console.log('Error: ', err);
    return formatJSONResponse({
      response: err,
      statusCode: 500,
      headers,
    });
  }
  
}

export const main = middyfy(importProductsFile);
