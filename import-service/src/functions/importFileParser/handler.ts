import { S3Event } from 'aws-lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { headers } from '@libs/headers';
import { middyfy } from '@libs/lambda';

import * as AWS from 'aws-sdk';
import csv from 'csv-parser';

export const importFileParser = async(event: S3Event) => {
    const s3 = new AWS.S3({ region: 'eu-central-1' });
    const sqs = new AWS.SQS();
    const BUCKET_NAME = process.env.BUCKET_NAME;

    try {
        for (const record of event.Records) {
            console.log(`Parsing ${record.s3.object.key} from ${BUCKET_NAME}`);
            console.log('Record: ', record);
            
            const key = record.s3.object.key;

            const stream = s3.getObject({
                Bucket: BUCKET_NAME,
                Key: key
            }).createReadStream();

            stream
                .pipe(csv())
                .on('data', (data) => {
                    console.log("Csv data: ", data)
                    const sqsMessage = {
                        QueueUrl: process.env.SQS_URL,
                        MessageBody: JSON.stringify(data)
                    }
                    console.log('SQS Message: ', sqsMessage);
                    sqs.sendMessage(sqsMessage, (err, msg) => {
                        err ? console.log('SQS Error: ', err) : console.log('SQS message has been successfully sent: ', msg);
                    })
                })
                .on('error', (err) => {
                    console.log('Parsing error: ', err);
                    return formatJSONResponse({
                        statusCode: 500,
                        headers,
                        response: 'Parsing error'
                    });
                  })
                .on('end', async() => {
                    console.log(`${record.s3.object.key} has been successfully parsed`);
                })

            const copyParams = {
                Bucket: BUCKET_NAME,
                Key: `parsed/${key.split('/')[1]}`,
                CopySource: `${BUCKET_NAME}/${key}`
            }

            const deleteParams = {
                Bucket : BUCKET_NAME,
                Key : key
            };

            await s3.copyObject(copyParams).promise();
            console.log(`Copied ${record.s3.object.key} to parsed/`);

            await s3.deleteObject(deleteParams).promise();
            console.log(`Deleted ${record.s3.object.key}`);
        }

        return formatJSONResponse({
            statusCode: 202,
            headers,
            response: 'Parsed'
        });
    } catch(err) {
        console.log('Error: ', err);
        return formatJSONResponse({
            statusCode: 500,
            headers,
            response: 'Parsing error'
        });
    }

}

export const main = middyfy(importFileParser);
