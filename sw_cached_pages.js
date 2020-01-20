const cacheName = 'V1';

const cacheAssets = [
    'Contribuye.html',
    'FAQ.html',
    'Informate.html',
    'Participa.html',
    'index.html',
    'main.js.',
    'pwa.js.',
    'sw_cached_pages.js.',
    'pwa3.css',
];
    
//activar el llamado Event
self.addEventListener( 'install', e => {
    console.log('Service Worker: Installed');
    
e.waitUntil(
    caches
    .open(cacheName)
    .then( cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
);
});

self.addEventListener( 'activate', e => {
    console.log('Service Worker: Activated');
    // borrar cache no deseado
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Borrar cache viejo');
                        return caches.delete(cache);
                    }
                })
            );
        })          //verificar si es cacheName o cacheNames
    );
});


// llamar al fetch event

self.addEventListener('fetch', e => {
    console.log('Service Worker : esta fecthing');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});