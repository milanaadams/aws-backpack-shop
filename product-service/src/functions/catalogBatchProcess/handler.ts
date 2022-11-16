import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { middyfy } from '@libs/lambda';
import { SQSEvent } from 'aws-lambda';

import * as productService from '@services/product.service';


export const catalogBatchProcess = async (event: SQSEvent) => {
    const sns = new SNSClient({ region: 'eu-central-1' });
    console.log('Catalog Batch process is starting ...');

    const items = event.Records.map(({ body }) => JSON.parse(body));
    console.log('Catalog Batch process incoming items: ', items);
    await Promise.all(
        items.map(async(item) => {
            const newProduct = await productService.createProduct(item);
            console.log('New product from batch process: ', newProduct);
            const params = new PublishCommand({
                Subject: 'New product has been added',
                Message: JSON.stringify(item),
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                  price: {
                    DataType: 'Number',
                    StringValue: item.price,
                  }
                }
              });
            console.log('SNS sending email for: ', item);
    
            try {
                await sns.send(params);
                console.log('Message has been sent to email');
            }catch(err){
              console.log('catalogBatchProcess error', err);
              const params = new PublishCommand({
                Subject: 'New product has not been added',
                Message: JSON.stringify(item),
                TopicArn: process.env.SNS_ARN,
              });
              await sns.send(params);
              console.log('Error message has been sent to email');
            }
        })
    )

};

export const main = middyfy(catalogBatchProcess);