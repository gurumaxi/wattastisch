import { build, files, prerendered, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

// @ts-ignore
self.__WB_DISABLE_DEV_LOGS = true;

const precacheList = [
    ...build,
    ...files,
    ...prerendered,
].map(s => ({
    url: s,
    revision: version,
}));

precacheAndRoute(precacheList);

// Force the new service worker to take control immediately
self.addEventListener('install', () => {
    self.skipWaiting();
});
