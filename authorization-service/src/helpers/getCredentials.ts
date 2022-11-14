export const getCredentials = (authorizationToken: string) => {
    const decoded = Buffer.from(authorizationToken.split(' ')[1], 'base64').toString('utf-8');
    const [userName, password] = decoded.split(':');
    return [userName, password];
  };