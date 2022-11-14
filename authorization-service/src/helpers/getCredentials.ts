export const getCredentials = (authorizationToken: string) => {
    const decoded = Buffer.from(authorizationToken.split(' ')[1], 'base64').toString('utf-8');
    console.log('Decoded creds: ', decoded);
    const [username, password] = decoded.split(':');
    return [username, password];
  };