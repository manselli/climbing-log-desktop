import { ENVIRONMENT_CONFIG } from "./environment.config";

export const environment = {
    stage: 'test-developing',
    apiUrl: ENVIRONMENT_CONFIG.dev.apiUrl,
    cognitoUserPool: ENVIRONMENT_CONFIG.dev.cognitoUserPool,
    cognitoClientId: ENVIRONMENT_CONFIG.dev.cognitoClientId
};
