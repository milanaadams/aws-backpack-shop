import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        authorizer: {
					name: 'basicAuthorizer',
          type: 'token',
					arn: 'arn:aws:lambda:eu-central-1:398158581759:function:auth-service-natallia-a-dev-basicAuthorizer',
					identitySource: 'method.request.header.Authorization',
					resultTtlInSeconds: 0
				}
      },
    },
  ],
};
