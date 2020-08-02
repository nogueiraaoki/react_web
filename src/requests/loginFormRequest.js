import axios from 'axios';
import { ROUTES } from '../config/routes';

export function loginClient(params) {
    const config = {
        method: ROUTES.loginClient.info.type,
        url: ROUTES.routeUrl + ROUTES.loginClient.info.url,
        data: {
            user: {
                email: params.email,
                password: params.password
            }
        }
    };

    return axios(config);
}
