import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

self.__WB_DISABLE_DEV_LOGS = true;

registerRoute(
    ({ url }) => url,
    new NetworkFirst()
);
