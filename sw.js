const CACHE_VERSION = 'v4';
const CACHE_NAME = `water-quality-${CACHE_VERSION}`;
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache).catch(err => console.warn('Cache error:', err)))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    // אל תנסה לטפל בבקשות CDN (cdnjs)
    if (event.request.url.includes('cdnjs.cloudflare.com')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200 && response.type !== 'error') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) return cachedResponse;
                    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
                });
            })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
