import { middyfy } from '@libs/lambda';
import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';

import * as productService from '@services/product.service';


export const catalogBatchProcess = async (event: SQSEvent) => {
    const sns = new SNS({ region: 'eu-central-1' });
    console.log('Catalog Batch process is starting ...');

    const items = event.Records.map(({ body }) => JSON.parse(body));
    console.log('Catalog Batch process incoming items: ', items);
    await Promise.all(
        items.map(async(item) => {
            const newProduct = await productService.createProduct(item);
            console.log('New product from batch process: ', newProduct);
            const params = {
                Subject: 'New product has been added',
                Message: JSON.stringify(item),
                TopicArn: process.env.SNS_ARN,
              };
            console.log('SNS sending email for: ', item);
    
            try {
                sns.publish(params);
                console.log('Message has been sent to email');
            }catch(err){
              console.log('catalogBatchProcess error', err);
              const params = {
                Subject: 'New product has not been added',
                Message: JSON.stringify(item),
                TopicArn: process.env.SNS_ARN,
              };
              sns.publish(params);
            }
        })
    )

};

export const main = middyfy(catalogBatchProcess);