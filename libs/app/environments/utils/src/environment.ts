export const environment = {
    TYPE: process.env['TYPE'],
    API_URL: process.env['API_URL'],
    COGNITO_USERPOOL_ID: process.env['COGNITO_USERPOOL_ID'] || 'none',
    COGNITO_APP_CLIENT_ID: process.env['COGNITO_APP_CLIENT_ID'] || 'none'
}