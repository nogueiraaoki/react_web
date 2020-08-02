import axios from 'axios';
import { ROUTES } from '../config/routes';

export function requestBlogPosts() {
    const config = {
        method: ROUTES.getBlogPosts.info.type,
        url: ROUTES.routeUrl + ROUTES.getBlogPosts.info.url,
        headers: {
        contentType: 'application/json',
        }
    };

    return axios(config);
}