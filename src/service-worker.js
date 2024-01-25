import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const precacheList = [
    ...build,
    ...files,
    ...prerendered,
].map(s => ({
    url: s,
    revision: version,
}));

precacheAndRoute(precacheList);
