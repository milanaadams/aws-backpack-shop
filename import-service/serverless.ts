import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service-natallia-adziyanava',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
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
        statements: [
        {
          Effect: 'Allow',
          Action: [
            's3:ListBucket',
          ],
          Resource: 'arn:aws:s3:::${self:provider.environment.BUCKET_NAME}'
        },
        {
          Effect: 'Allow',
          Action: [
            's3:*',
          ],
          Resource: 'arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*'
        },
        {
          Effect: 'Allow',
          Action: 'sqs:*',
          Resource: '${param:CatalogItemsQueueArn}'
        }
      ]
      }
    },
    profile: 'js-cc4-auto',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_NAME: 'import-products-natallia-adziyanava',
      SQS_URL: '${param:CatalogItemsQueueURL}',
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    extensions: {
      IamRoleCustomResourcesLambdaExecution: {
        Properties: {
          PermissionsBoundary: 'arn:aws:iam::${aws:accountId}:policy/eo_role_boundary'
        }
      }
    },
    Resources: {
      GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: '5ozs9x5ate',
        },
      },
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
  },
};

module.exports = serverlessConfiguration;
