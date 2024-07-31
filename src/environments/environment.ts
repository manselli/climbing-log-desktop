import { ENVIRONMENT_CONFIG } from "./environment.config";

export const environment = {
    stage: 'production',
    apiUrl: ENVIRONMENT_CONFIG.prod.apiUrl,
    cognitoUserPool: ENVIRONMENT_CONFIG.prod.cognitoUserPool,
    cognitoClientId: ENVIRONMENT_CONFIG.prod.cognitoClientId
};;
