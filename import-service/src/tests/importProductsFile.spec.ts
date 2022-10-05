

import AWSMock from 'aws-sdk-mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { importProductsFile } from '@functions/importProductsFile/handler';

const fileName = 'fake.csv';

describe('importProductsFile', () => {
  afterEach(() => {
    AWSMock.restore('S3');
  });

  test('Should return signed url', async () => {
    AWSMock.mock('S3', 'getSignedUrl', `https://aws-signed-url.com/${fileName}`);

    const event: APIGatewayProxyEvent = { queryStringParameters: { name: fileName } } as any;

    const res = (await importProductsFile(event)) as APIGatewayProxyResult;
    expect(JSON.parse(res.body)).toEqual(`https://aws-signed-url.com/${fileName}`);
    expect(res.statusCode).toEqual(200);
  });

  test('Should return 500 and error message if name is not provided', async () => {

    const event: APIGatewayProxyEvent = {
      queryStringParameters: {  },
    } as any;

    const res = (await importProductsFile(event)) as APIGatewayProxyResult;
    expect(res.statusCode).toEqual(500);
    expect(res.body).toContain('Error: no filename provided');
  });
});