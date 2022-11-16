import type { AWS } from '@serverless/typescript';

import basicAuthorizer from '@functions/basicAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'auth-service-natallia-a',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  useDotenv: true,
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
      },
    },
    profile: 'js-cc4-auto',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { basicAuthorizer },
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
  },
};

module.exports = serverlessConfiguration;
