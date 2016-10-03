import axios from 'axios';
import url from 'url';

export class CallApi {
    static get(urlString, data, config) {
        return axios.get(transformUrl(urlString), data, createConfig(config));
    }

    static post(urlString, data, config) {
        return axios.post(transformUrl(urlString), data, createConfig(config));
    }

    static signIn(token) {
        const config = {
            headers: {
                'Authentication' : `Basic ${token}`
            }
        };

        return CallApi.get('/user', {}, config);
    }
}

export function transformUrl(urlString) {
    const isDev = !process.env.NODE_ENV
        || process.env.NODE_ENV === 'development';

    if (isDev) {
        let parsedUrl = url.parse(urlString);

        const localUrl = url.parse('http://localhost:3000');

        parsedUrl = parsedUrl.host
            ? localUrl.resolve(urlString.replace('/external', ''))
            : localUrl.resolve('external' + urlString);

        return parsedUrl;
    }

    return urlString;
}

export function toRepresentativeError(error, context) {

}

function createConfig(config = {}) {
    if (config) {
        if (config.headers) {
            config.headers['Authentication'] = `Basic`
        } else {
            config.headers = {
                'Authentication': `Basic`
            }
        }
    }

    return config;
}
