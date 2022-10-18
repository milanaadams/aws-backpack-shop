import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service-natallia-adziyanava',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger','serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iam: {
      role: {
        permissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary',
        statements: [{
          Effect: 'Allow',
          Action: [
            's3:*',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem'
          ],
          Resource: {
            'Fn::GetAtt': ['ProductsTable', 'Arn'],
          },
        }, {
          Effect: 'Allow',
          Action: ['sns:*'],
          Resource: {
            Ref: 'createProductTopic',
        },
        }]
      }
    },
    profile: 'js-cc4-auto',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DYNAMO_TABLE_NAME: 'products-table-natallia-adziyanava',
      SNS_ARN: { Ref: 'createProductTopic' },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
  package: { individually: true },
  resources: {
    Resources: {
      ProductsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:provider.environment.DYNAMO_TABLE_NAME}",
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'id',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
      CatalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'CatalogItemsQueue-natallia-adziyanava'
        }
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic-natallia-adziyanava',
        },
      },
      createProductTopicSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'milanaadams@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'createProductTopic' },
        },
      },
      createProductTopicSubscriptionExpensive: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'kelly88@mail.ru',
          Protocol: 'email',
          TopicArn: { Ref: 'createProductTopic' },
          FilterPolicy: {
            price: [{ numeric: ['>=', 50] }],
          },
        },
      }
    },
    Outputs: {
      CatalogItemsQueueURL: { 
        Value: { Ref: 'CatalogItemsQueue' } 
      },
      CatalogItemsQueueArn: {
        Value: { 'Fn::GetAtt': ['CatalogItemsQueue', 'Arn'] }
      }
    }
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      typefiles: ['./src/models/product.model.ts'],
      apiType: 'http',
      useStage: true,
      basePath: '/dev',
    }
  },
};

module.exports = serverlessConfiguration;
