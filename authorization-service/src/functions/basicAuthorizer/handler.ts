import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { headers } from '@libs/headers';

import { getCredentials } from '@helpers/getCredentials';
import { generatePolicy } from '@helpers/generatePolicy';

export const basicAuthorizer = async (
    event: APIGatewayTokenAuthorizerEvent) => {
    
    console.log('Decoding credentials...', event);
        const ALLOW = 'Allow';
        const DENY = 'Deny';

        try {

            const { type, authorizationToken } = event;

        if (!authorizationToken || type !== 'TOKEN') {
            console.log('Basic authorizer: No auth token provided');
            return formatJSONResponse({
                statusCode: 401,
                headers,
                response: 'Unauthorized'
            });
        };

            const [username, password] = getCredentials(authorizationToken);
            const validPassword = process.env[username];

            const isValid = username && password && validPassword === password;
            const access = isValid ? ALLOW : DENY;

            const policy = generatePolicy(username, access, event.methodArn);

            console.log('Authorization policy: ', JSON.stringify(policy));

		    return policy;

        } catch (err) {
            console.log('err');
            return formatJSONResponse({
                statusCode: 403,
                headers,
                response: 'Forbidden'
            });
        }


};

export const main = middyfy(basicAuthorizer);