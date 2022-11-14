import { middyfy } from '@libs/lambda';
import { APIGatewayAuthorizerCallback, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

import { getCredentials } from '@helpers/getCredentials';
import { generatePolicy } from '@helpers/generatePolicy';

export const basicAuthorizer = async (
    event: APIGatewayTokenAuthorizerEvent,
	_ctx: any,
	cb: APIGatewayAuthorizerCallback) => {
    
    console.log('Decoding credentials...', event);
        const ALLOW = 'Allow';
        const DENY = 'Deny';
        const { type, authorizationToken } = event;

        if (!authorizationToken || type !== 'TOKEN') {
            console.log('Basic authorizer: Unauthorized');
            cb('Unauthorized');
        };

        try {

            const [username, password] = getCredentials(authorizationToken);
            const validPassword = process.env[username];

            const isValid = username && password && validPassword === password;
            const access = isValid ? ALLOW : DENY;

            const policy = generatePolicy(username, access, event.methodArn);

            console.log('Authorization policy: ', JSON.stringify(policy));

		    cb(null, policy);

        } catch (err) {
            console.log('err');
            cb(`Unauthorized: ${err}`);
        }


};

export const main = middyfy(basicAuthorizer);