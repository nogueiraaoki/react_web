import axios from 'axios';
import { ROUTES } from '../config/routes';

export function registerClient(params) {
    const config = {
        method: ROUTES.registerClient.info.type,
        url: ROUTES.routeUrl + ROUTES.registerClient.info.url,
        data: {
            user: {
                email: params.email,
                password: params.password
            }
        }
    };

    return axios(config);
}
