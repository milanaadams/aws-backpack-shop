import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { headers } from '@libs/headers';

import { generatePolicy } from '@helpers/generatePolicy';

export const basicAuthorizer = async (
    event: APIGatewayTokenAuthorizerEvent) => {
    
    console.log('Decoding credentials...', event);
        const ALLOW = 'Allow';
        const DENY = 'Deny';

        try {

            const { type, authorizationToken, methodArn } = event;

        if (!authorizationToken || type !== 'TOKEN') {
            console.log('Basic authorizer: No authorization token provided');
            return formatJSONResponse({
                statusCode: 401,
                headers,
                response: 'Unauthorized'
            });
        };

        const encodedCreds = authorizationToken.split(' ')[1];
        const decoded = Buffer.from(encodedCreds, 'base64').toString('utf-8');
        console.log('Decoded creds: ', decoded);
        const [username, password] = decoded.split(':');

            const validPassword = process.env[username];

            const isValid = username && password && validPassword === password;
            const access = isValid ? ALLOW : DENY;

            const policy = generatePolicy(encodedCreds, methodArn, access);

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