import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';

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
      role: 'arn:aws:iam::398158581759:role/BasicLambdaExecutionRole',
    },
    profile: 'js-cc4-auto',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById },
  package: { individually: true },
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
