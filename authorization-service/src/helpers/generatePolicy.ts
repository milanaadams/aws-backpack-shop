export const generatePolicy = (principalId: string, resource: string, access: string) => {
    return {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{ 
            Action: 'execute-api:Invoke', 
            Effect: access, 
            Resource: resource }],
      },
    }
};