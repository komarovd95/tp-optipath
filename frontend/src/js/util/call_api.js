import url from 'url';

export default function transformUrl(urlStr) {
    const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    if (isDev) {
        let parsedUrl = url.parse(urlStr);

        const localUrl = url.parse('http://localhost:3000');

        parsedUrl = parsedUrl.host
            ? localUrl.resolve(urlStr.replace('/external', ''))
            : localUrl.resolve('external' + urlStr);
        console.log(localUrl);

        return parsedUrl;
    }

    return urlStr;
}
